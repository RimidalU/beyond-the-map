import { InternalServerErrorException } from '@nestjs/common'

export class DatabaseError extends InternalServerErrorException {
    constructor() {
        super(`Database error`)
    }
}
