import { Test, TestingModule } from '@nestjs/testing'
import { ExpressRequestType } from '@src/users/types/express-request.type'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LoginResponseDto } from './dto/login-response.dto'
import { UserValidatedType } from './types/user.type'
import { ValidateUserDto } from './dto/validate-user.dto'

describe('AuthController', () => {
    let controller: AuthController
    let authService: AuthService

    const mockUserValidated: UserValidatedType = {
        id: 1,
        username: 'testuser',
        email: 'test@email.com',
        created_at: new Date(),
        articles: [],
    }
    const mockLoginResponse: LoginResponseDto = { access_token: 'signed-token' }
    const mockValidateUserDto: ValidateUserDto = {
        email: 'test@email.com',
        password: 'password',
    }
    const mockRequest: ExpressRequestType = {
        user: mockUserValidated,
    } as ExpressRequestType

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockReturnValue(mockLoginResponse),
                    },
                },
            ],
        }).compile()

        controller = module.get<AuthController>(AuthController)
        authService = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('login', () => {
        it('should return access_token', () => {
            const result = controller.login(mockValidateUserDto, mockRequest)
            expect(result).toEqual(mockLoginResponse)
            expect(authService.login).toHaveBeenCalledWith(mockUserValidated)
        })
    })
})
