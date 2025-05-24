import { applyDecorators } from '@nestjs/common'
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger'
import { UserNotFoundDTO } from '@src/users/dto/user-note-found.response.dto'

import { SuccessResponseDto } from '../dto/success-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'

export function CreateSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new Article' }),

        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Article created',
            type: SuccessResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: UserNotFoundDTO,
        }),
    )
}
