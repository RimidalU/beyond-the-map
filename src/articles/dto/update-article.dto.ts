import { IsString, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateArticleDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Exploring Local Landmarks',
        description: 'Article title',
    })
    title?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'A guide to the most interesting local landmarks.',
        description: 'Article description',
    })
    description?: string

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        example: true,
        description: 'Is the article local?',
        default: false,
    })
    is_local?: boolean

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Downtown',
        description: 'Locality name',
    })
    locality_name?: string
}
