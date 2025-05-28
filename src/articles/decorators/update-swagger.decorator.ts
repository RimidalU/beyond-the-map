import { applyDecorators } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { SuccessResponseDto } from '../dto/success-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { ArticleNotFoundDTO } from '../dto/article-note-found.response.dto'

export function UpdateSwaggerDecorator() {
    return applyDecorators(
        ApiBearerAuth(),

        ApiOperation({ summary: 'Update Article' }),
        ApiNotFoundResponse({
            description: 'Article not found',
            type: ArticleNotFoundDTO,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Article updated',
            type: SuccessResponseDto,
        }),
    )
}
