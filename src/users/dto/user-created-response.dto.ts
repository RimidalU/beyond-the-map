import { ApiProperty } from '@nestjs/swagger'

export class UserCreatedResponseDto {
    @ApiProperty({
        example: '22',
        description: 'User Id',
    })
    readonly userId: number
}
