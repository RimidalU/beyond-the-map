import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ExpressRequestType } from '@src/users/types/express-request.type'

import { AuthService } from './auth.service'
import { ValidateUserDto } from './dto/validate-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { LoginSwaggerDecorator } from './decorators/login-swagger.decorator'
import { UserValidatedType } from './types/user.type'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @LoginSwaggerDecorator()
    login(
        @Body() createUserDto: ValidateUserDto,
        @Request() req: ExpressRequestType,
    ): LoginResponseDto {
        return this.authService.login(req.user as UserValidatedType)
    }
}
