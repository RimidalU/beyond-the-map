import { IsOptional, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddTagsDto {
    @IsArray()
    @IsOptional()
    @ApiProperty({
        example: ['landmark', 'guide', 'local'],
        description: 'List of tags',
    })
    tags: string[]
}
