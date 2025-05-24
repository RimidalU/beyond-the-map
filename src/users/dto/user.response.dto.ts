import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
    @ApiProperty({
        example: '11',
        description: 'User Id',
    })
    readonly id: number

    @ApiProperty({
        example: 'Don Dou',
        description: 'User Name',
    })
    readonly username: string
}
