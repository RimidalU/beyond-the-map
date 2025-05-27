import { applyDecorators } from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger'

import { ArticleResponseDto } from '../dto/article-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'

export function FindAllSwaggerDecorator() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({ summary: 'Find all articles' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Articles found',
            type: [ArticleResponseDto],
        }),
        ApiResponse({
            status: 200,
            description: 'Articles found',
            type: [ArticleResponseDto],
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Items on page',
        }),
        ApiQuery({
            name: 'offset',
            required: false,
            type: Number,
            description: 'Offset on page',
        }),
        ApiQuery({
            name: 'author',
            required: false,
            type: String,
            description: 'Author username ',
        }),
        ApiQuery({
            name: 'title',
            required: false,
            type: String,
            description: 'Article name ',
        }),
        ApiQuery({
            name: 'is_local',
            required: false,
            type: Boolean,
            description: 'Filter by local status',
        }),
        ApiQuery({
            name: 'tag',
            required: false,
            type: String,
            description: 'Filter by tag (exact match)',
        }),
    )
}
