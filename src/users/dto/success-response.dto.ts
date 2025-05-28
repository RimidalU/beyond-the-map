import { ApiProperty } from '@nestjs/swagger'

export class SuccessResponseDto {
    @ApiProperty({
        example: '22',
        description: 'Entity Id',
    })
    readonly id: number
}
