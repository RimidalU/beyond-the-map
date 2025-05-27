import { Test, TestingModule } from '@nestjs/testing'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SuccessResponseDto } from './dto/success-response.dto'
import { UserResponseDto } from './dto/user.response.dto'

describe('UsersController', () => {
    let controller: UsersController
    let usersService: UsersService

    const mockUser = { id: 1, username: 'testuser', email: 'test@email.com' }
    const mockUserResponse: UserResponseDto = mockUser
    const mockSuccessResponse: SuccessResponseDto = { id: mockUser.id }
    const mockUsers = [mockUserResponse]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        createUser: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                        findAll: jest.fn().mockResolvedValue(mockUsers),
                        findById: jest.fn().mockResolvedValue(mockUserResponse),
                        updateUser: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                        deleteUser: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                    },
                },
            ],
        }).compile()

        controller = module.get<UsersController>(UsersController)
        usersService = module.get<UsersService>(UsersService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('create', () => {
        it('should call usersService.createUser with correct parameters', async () => {
            const userData: CreateUserDto = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'password',
            }
            const result = await controller.create(userData)
            expect(usersService.createUser).toHaveBeenCalledWith(userData)
            expect(result).toEqual(mockSuccessResponse)
        })
    })

    describe('findAll', () => {
        it('should call usersService.findAll and return users', async () => {
            const result = await controller.findAll()
            expect(usersService.findAll).toHaveBeenCalled()
            expect(result).toEqual(mockUsers)
        })
    })

    describe('findOne', () => {
        it('should call usersService.findById with id', async () => {
            const id = '1'
            const result = await controller.findOne(id)
            expect(usersService.findById).toHaveBeenCalledWith(+id)
            expect(result).toEqual(mockUserResponse)
        })
    })

    describe('update', () => {
        it('should call usersService.updateUser with id and data', async () => {
            const id = '1'
            const updateData: UpdateUserDto = {
                username: 'updated',
                email: 'updated@email.com',
            }
            const result = await controller.update(id, updateData)
            expect(usersService.updateUser).toHaveBeenCalledWith(
                +id,
                updateData,
            )
            expect(result).toEqual(mockSuccessResponse)
        })
    })

    describe('remove', () => {
        it('should call usersService.deleteUser with id', async () => {
            const id = '1'
            const result = await controller.remove(id)
            expect(usersService.deleteUser).toHaveBeenCalledWith(+id)
            expect(result).toEqual(mockSuccessResponse)
        })
    })
})
