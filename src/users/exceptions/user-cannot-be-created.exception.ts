import { ConflictException } from '@nestjs/common'

export class UserCannotBeCreated extends ConflictException {
    constructor(email: string) {
        super(`User cannot be created. Email '${email}' already exists`)
    }
}
