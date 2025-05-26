import { applyDecorators } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { UserResponseDto } from '../dto/user.response.dto'

export function FindAllSwaggerDecorator() {
    return applyDecorators(
        ApiBearerAuth(),

        ApiOperation({ summary: 'Find all users' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Users found',
            type: [UserResponseDto],
        }),
    )
}
