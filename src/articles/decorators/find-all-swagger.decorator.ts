import { applyDecorators } from '@nestjs/common'
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { ArticleResponseDto } from '../dto/article-response.dto'

export function FindAllSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Find all articles' }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Articles found',
            type: [ArticleResponseDto],
        }),
    )
}
