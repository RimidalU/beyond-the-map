import { ConflictException } from '@nestjs/common'

export class ArticleCannotBeCreated extends ConflictException {
    constructor() {
        super(`Article cannot be created.`)
    }
}
