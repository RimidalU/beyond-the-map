import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsArray,
    IsBoolean,
    IsDateString,
    IsUrl,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ArticleResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Exploring Local Landmarks',
        description: 'Article title',
    })
    title: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'A guide to the most interesting local landmarks.',
        description: 'Article description',
    })
    description?: string

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional({
        example: '2025-05-24T12:00:00Z',
        description: 'Publication date',
    })
    published_at?: Date

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({
        example: ['landmark', 'guide', 'local'],
        description: 'List of tags',
    })
    tags?: string[]

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        example: true,
        description: 'Is the article local?',
        default: false,
    })
    is_local?: boolean

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Downtown',
        description: 'Locality name',
    })
    locality_name: string

    @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'https://example.com/landmarks',
        description: 'URL to landmarks',
    })
    landmarks_url?: string

    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Author ID',
    })
    author: number
}
