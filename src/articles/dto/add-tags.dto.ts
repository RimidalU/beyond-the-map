import { IsArray, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddTagsDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        example: ['landmark', 'guide', 'local'],
        description: 'List of tags',
    })
    tags: string[]
}
