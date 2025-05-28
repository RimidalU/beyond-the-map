import { NotFoundException } from '@nestjs/common'

export class ArticleNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Article with id ${id} not found`)
    }
}
