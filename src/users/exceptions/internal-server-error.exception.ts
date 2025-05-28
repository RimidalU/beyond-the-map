import { InternalServerErrorException } from '@nestjs/common'

export class InternalServerError extends InternalServerErrorException {
    constructor() {
        super(`Internal Server Error`)
    }
}
