import { IsOptional, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PublishedArticleDto {
    @IsDateString()
    @IsOptional()
    @ApiProperty({
        example: '2025-05-24T12:00:00Z',
        description: 'Publication date',
    })
    published_at: Date
}
