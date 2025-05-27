import { Test, TestingModule } from '@nestjs/testing'

import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { UsersEntity } from './entities/users.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { SuccessResponseDto } from './dto/success-response.dto'
import { UserResponseDto } from './dto/user.response.dto'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { UpdateUserDto } from './dto/update-user.dto'

describe('UsersService', () => {
    let service: UsersService
    let usersRepository: UsersRepository

    const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@email.com',
    } as UsersEntity
    const mockUserResponse: UserResponseDto = mockUser
    const mockUsers = [mockUserResponse]
    const mockSuccessResponse: SuccessResponseDto = { id: mockUser.id }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: {
                        createAndSave: jest.fn().mockResolvedValue(mockUser.id),
                        findAll: jest.fn().mockResolvedValue(mockUsers),
                        findById: jest.fn().mockResolvedValue(mockUserResponse),
                        updateById: jest
                            .fn()
                            .mockResolvedValue({ affected: 1 }),
                        deleteById: jest
                            .fn()
                            .mockResolvedValue({ affected: 1 }),
                        findByEmail: jest.fn().mockResolvedValue(mockUser),
                    },
                },
            ],
        }).compile()

        service = module.get<UsersService>(UsersService)
        usersRepository = module.get<UsersRepository>(UsersRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('createUser', () => {
        it('should create user and return id', async () => {
            const userData: CreateUserDto = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
            }
            const result = await service.createUser(userData)
            expect(result).toEqual(mockSuccessResponse)
            expect(usersRepository.createAndSave).toHaveBeenCalled()
        })
    })

    describe('findAll', () => {
        it('should return all users', async () => {
            const result = await service.findAll()
            expect(result).toEqual(mockUsers)
            expect(usersRepository.findAll).toHaveBeenCalled()
        })
    })

    describe('findById', () => {
        it('should return user by id', async () => {
            const result = await service.findById(mockUser.id)
            expect(result).toEqual(mockUserResponse)
            expect(usersRepository.findById).toHaveBeenCalledWith(mockUser.id)
        })

        it('should throw if user not found', async () => {
            jest.spyOn(usersRepository, 'findById').mockResolvedValueOnce(null)
            await expect(service.findById(mockUser.id)).rejects.toThrow(
                UserNotFoundException,
            )
        })
    })

    describe('updateUser', () => {
        it('should update user and return id', async () => {
            const updateData: UpdateUserDto = {
                username: 'updated',
                email: 'updated@email.com',
            }
            const result = await service.updateUser(mockUser.id, updateData)
            expect(result).toEqual(mockSuccessResponse)
            expect(usersRepository.updateById).toHaveBeenCalledWith(
                mockUser.id,
                updateData,
            )
        })

        it('should throw if user not found', async () => {
            jest.spyOn(usersRepository, 'updateById').mockResolvedValueOnce({
                affected: 0,
                raw: [],
                generatedMaps: [],
            })
            await expect(
                service.updateUser(mockUser.id, {} as UpdateUserDto),
            ).rejects.toThrow(UserNotFoundException)
        })
    })

    describe('deleteUser', () => {
        it('should delete user and return id', async () => {
            const result = await service.deleteUser(mockUser.id)
            expect(result).toEqual(mockSuccessResponse)
            expect(usersRepository.deleteById).toHaveBeenCalledWith(mockUser.id)
        })

        it('should throw if user not found', async () => {
            jest.spyOn(usersRepository, 'deleteById').mockResolvedValueOnce({
                affected: 0,
                raw: [],
            })
            await expect(service.deleteUser(mockUser.id)).rejects.toThrow(
                UserNotFoundException,
            )
        })
    })

    describe('findByEmail', () => {
        it('should return user by email', async () => {
            const result = await service.findByEmail(mockUser.email)
            expect(result).toEqual(mockUser)
            expect(usersRepository.findByEmail).toHaveBeenCalledWith(
                mockUser.email,
            )
        })

        it('should throw if user not found', async () => {
            jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
                null,
            )
            await expect(service.findByEmail(mockUser.email)).rejects.toThrow(
                UserNotFoundException,
            )
        })
    })
})
