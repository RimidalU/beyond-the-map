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
import { ArticleNotFoundDTO } from '../dto/article-note-found.response.dto'

export function RemoveSwaggerDecorator() {
    return applyDecorators(
        ApiBearerAuth(),

        ApiOperation({ summary: 'Delete Article' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: ArticleNotFoundDTO,
        }),
        ApiResponse({
            status: 204,
            description: 'Article removed',
            type: SuccessResponseDto,
        }),
    )
}
