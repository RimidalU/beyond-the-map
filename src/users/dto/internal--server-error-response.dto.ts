import { ApiProperty } from '@nestjs/swagger'

export class InternalServerErrorResponseDto {
    @ApiProperty({
        example: 'User not created',
        description: ' User not created',
    })
    readonly message: string

    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Internal Server Error',
    })
    readonly error: string

    @ApiProperty({
        example: 500,
        description: '500',
    })
    readonly statusCode: number
}
