import { applyDecorators } from '@nestjs/common'
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { UserCreatedResponseDto } from '../dto/user-created-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { UserAlreadyExistsResponseDto } from '../dto/user-already-existsresponse.dto'

export function CreateSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new User' }),
        ApiConflictResponse({
            description: 'User already exists',
            type: UserAlreadyExistsResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'User created',
            type: UserCreatedResponseDto,
        }),
    )
}
