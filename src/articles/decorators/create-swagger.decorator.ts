import { applyDecorators } from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { SuccessResponseDto } from '../dto/success-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { BadRequestResponseDto } from '../dto/bad-request.response.dto'

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
        ApiBadRequestResponse({
            description: 'Invalid author ID',
            type: BadRequestResponseDto,
        }),
    )
}
