import { ApiProperty } from '@nestjs/swagger'

export class UserNotFoundDTO {
    @ApiProperty({
        example: 'User with id 13 not found',
        description: 'User not found',
    })
    readonly message: string

    @ApiProperty({
        example: 'Not Found',
        description: 'Not Found',
    })
    readonly error: string

    @ApiProperty({
        example: 404,
        description: '404',
    })
    readonly statusCode: number
}
