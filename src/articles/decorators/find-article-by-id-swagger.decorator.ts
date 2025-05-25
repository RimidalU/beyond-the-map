import { applyDecorators } from '@nestjs/common'
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { ArticleResponseDto } from '../dto/article-response.dto'
import { ArticleNotFoundDTO } from '../dto/article-note-found.response.dto'

export function FindArticleByIdSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Find article by id' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: ArticleNotFoundDTO,
        }),
        ApiCreatedResponse({
            description: 'Article found',
            type: ArticleResponseDto,
        }),
    )
}
