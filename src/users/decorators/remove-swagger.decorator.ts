import { applyDecorators } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'

import { SuccessResponseDto } from '../dto/success-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { UserNotFoundDTO } from '../dto/user-note-found.response.dto'

export function RemoveSwaggerDecorator() {
    return applyDecorators(
        ApiBearerAuth(),

        ApiOperation({ summary: 'Delete User' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: UserNotFoundDTO,
        }),
        ApiResponse({
            status: 204,
            description: 'User removed',
            type: SuccessResponseDto,
        }),
    )
}
