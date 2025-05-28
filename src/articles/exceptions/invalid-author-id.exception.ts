import { BadRequestException } from '@nestjs/common'

export class InvalidAuthorIdException extends BadRequestException {
    constructor() {
        super(`The provided author ID is not valid.`)
    }
}
