import { ApiProperty } from '@nestjs/swagger'

export class ArticleNotFoundDTO {
    @ApiProperty({
        example: 'Article with id 13 not found',
        description: 'Article not found',
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
