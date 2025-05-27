import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '@src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersEntity } from '@src/users/entities/users.entity'

import { UserValidatedType } from './types/user.type'
import { ValidateUserDto } from './dto/validate-user.dto'
import { AuthService } from './auth.service'

describe('AuthService', () => {
    let service: AuthService
    let usersService: UsersService
    let jwtService: JwtService

    const mockUser: UsersEntity = {
        id: 1,
        username: 'testuser',
        email: 'test@email.com',
        password: 'hashed-password',
        created_at: new Date(),
        updated_at: new Date(),
        articles: [],
        hashPassword: async () => {},
    }

    const mockValidatedUser: UserValidatedType = {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        created_at: mockUser.created_at,
        articles: mockUser.articles,
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findByEmail: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('signed-token'),
                    },
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        usersService = module.get<UsersService>(UsersService)
        jwtService = module.get<JwtService>(JwtService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('validateUser', () => {
        it('should return user if credentials are valid', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(
                mockUser,
            )
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() =>
                Promise.resolve(true),
            )

            const credentials: ValidateUserDto = {
                email: 'test@email.com',
                password: 'password',
            }
            const result = await service.validateUser(credentials)

            expect(result).toEqual(mockValidatedUser)
        })

        it('should return null if password is invalid', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(
                mockUser,
            )
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() =>
                Promise.resolve(false),
            )

            const credentials: ValidateUserDto = {
                email: 'test@email.com',
                password: 'password',
            }
            const result = await service.validateUser(credentials)

            expect(result).toBeNull()
        })
    })

    describe('login', () => {
        it('should return access_token', () => {
            const result = service.login(mockValidatedUser)

            expect(result).toEqual({ access_token: 'signed-token' })
            expect(jwtService.sign).toHaveBeenCalledWith({
                id: mockValidatedUser.id,
                name: mockValidatedUser.username,
                email: mockValidatedUser.email,
            })
        })
    })
})
