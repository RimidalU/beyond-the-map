import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateArticleDto {
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
    description: string

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        example: true,
        description: 'Is the article local?',
        default: false,
    })
    is_local: boolean

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Downtown',
        description: 'Locality name',
    })
    locality_name: string

    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Author ID',
    })
    authorId: number
}
