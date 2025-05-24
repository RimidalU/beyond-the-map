import { applyDecorators } from '@nestjs/common'
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { UserResponseDto } from '../dto/user.response.dto'
import { UserNotFoundDTO } from '../dto/user-note-found.response.dto'

export function FindUserByIdSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Find user by id' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: UserNotFoundDTO,
        }),
        ApiCreatedResponse({
            description: 'User found',
            type: UserResponseDto,
        }),
    )
}
