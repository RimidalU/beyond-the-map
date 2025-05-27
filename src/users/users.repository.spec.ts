import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult, DeleteResult } from 'typeorm'

import { UsersRepository } from './users.repository'
import { UsersEntity } from './entities/users.entity'
import { InternalServerError } from './exceptions/internal-server-error.exception'
import { UserCannotBeCreated } from './exceptions/user-cannot-be-created.exception'
import { UserResponseDto } from './dto/user.response.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

describe('UsersRepository', () => {
    let repository: UsersRepository
    let repo: Repository<UsersEntity>

    const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@email.com',
        password: 'password',
    }
    const mockUserResponse: UserResponseDto = {
        id: mockUser.id,
        username: mockUser.username,
    }
    const mockUsers = [mockUserResponse]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersRepository,
                {
                    provide: getRepositoryToken(UsersEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(mockUser),
                        find: jest.fn().mockResolvedValue(mockUsers),
                        findOne: jest.fn().mockResolvedValue(mockUserResponse),
                        update: jest.fn().mockResolvedValue({
                            affected: 1,
                            raw: [],
                            generatedMaps: [],
                        } as UpdateResult),
                        delete: jest.fn().mockResolvedValue({
                            affected: 1,
                            raw: [],
                        } as DeleteResult),
                        findOneBy: jest.fn().mockResolvedValue(mockUser),
                    },
                },
            ],
        }).compile()

        repository = module.get<UsersRepository>(UsersRepository)
        repo = module.get<Repository<UsersEntity>>(
            getRepositoryToken(UsersEntity),
        )
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    describe('createAndSave', () => {
        it('should create user and return id', async () => {
            const userData: CreateUserDto = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
            }
            const result = await repository.createAndSave(userData)
            expect(result).toEqual(mockUser.id)
            expect(repo.save).toHaveBeenCalledWith(userData)
        })

        it('should throw UserCannotBeCreated on unique violation', async () => {
            const error = { code: '23505' } as Error & { code: string }
            jest.spyOn(repo, 'save').mockRejectedValueOnce(error)
            const userData: CreateUserDto = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
            }
            await expect(repository.createAndSave(userData)).rejects.toThrow(
                UserCannotBeCreated,
            )
        })

        it('should throw InternalServerError on other error', async () => {
            jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error())
            const userData: CreateUserDto = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
            }
            await expect(repository.createAndSave(userData)).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('findAll', () => {
        it('should return all users', async () => {
            const result = await repository.findAll()
            expect(result).toEqual(mockUsers)
            expect(repo.find).toHaveBeenCalledWith({
                select: { id: true, username: true },
            })
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'find').mockRejectedValueOnce(
                new InternalServerError(),
            )
            await expect(repository.findAll()).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('findById', () => {
        it('should return user by id', async () => {
            const result = await repository.findById(mockUser.id)
            expect(result).toEqual(mockUserResponse)
            expect(repo.findOne).toHaveBeenCalledWith({
                select: { id: true, username: true },
                where: { id: mockUser.id },
            })
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'findOne').mockRejectedValueOnce(
                new InternalServerError(),
            )
            await expect(repository.findById(mockUser.id)).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('updateById', () => {
        it('should update user and return UpdateResult', async () => {
            const updateData: UpdateUserDto = {
                username: 'updated',
                email: 'updated@email.com',
            }
            const result = await repository.updateById(mockUser.id, updateData)
            expect(result).toEqual({ affected: 1, raw: [], generatedMaps: [] })
            expect(repo.update).toHaveBeenCalledWith(mockUser.id, updateData)
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error())
            await expect(
                repository.updateById(mockUser.id, {} as UpdateUserDto),
            ).rejects.toThrow(InternalServerError)
        })
    })

    describe('deleteById', () => {
        it('should delete user and return DeleteResult', async () => {
            const result = await repository.deleteById(mockUser.id)
            expect(result).toEqual({ affected: 1, raw: [] })
            expect(repo.delete).toHaveBeenCalledWith(mockUser.id)
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error())
            await expect(repository.deleteById(mockUser.id)).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('findByEmail', () => {
        it('should return user by email', async () => {
            const result = await repository.findByEmail(mockUser.email)
            expect(result).toEqual(mockUser)
            expect(repo.findOneBy).toHaveBeenCalledWith({
                email: mockUser.email,
            })
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'findOneBy').mockRejectedValueOnce(
                new InternalServerError(),
            )
            await expect(
                repository.findByEmail(mockUser.email),
            ).rejects.toThrow(InternalServerError)
        })
    })
})
