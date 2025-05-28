import { ApiProperty } from '@nestjs/swagger'

export class BadRequestResponseDto {
    @ApiProperty({
        example: 'The provided author ID is not valid.',
        description: 'Bad Request',
    })
    readonly message: string

    @ApiProperty({
        example: 'Bad Request',
        description: 'Bad Request',
    })
    readonly error: string

    @ApiProperty({
        example: 400,
        description: '400',
    })
    readonly statusCode: number
}
