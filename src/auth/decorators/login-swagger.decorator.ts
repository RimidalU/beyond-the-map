import { applyDecorators } from '@nestjs/common'
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { LoginResponseDto } from '../dto/login-response.dto'

export function LoginSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Get Access Token by Email and Password' }),
        ApiNotFoundResponse({ description: 'Not Found' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiCreatedResponse({
            description: 'Correct User Data',
            type: LoginResponseDto,
        }),
    )
}
