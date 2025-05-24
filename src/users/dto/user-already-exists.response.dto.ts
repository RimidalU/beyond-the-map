import { ApiProperty } from '@nestjs/swagger'

export class UserAlreadyExistsResponseDto {
    @ApiProperty({
        example:
            "User cannot be created. Email 'don-dou@email.com' already exist",
        description: 'User not created',
    })
    readonly message: string

    @ApiProperty({
        example: 'Conflict',
        description: 'Conflict',
    })
    readonly error: string

    @ApiProperty({
        example: 409,
        description: '409',
    })
    readonly statusCode: number
}
