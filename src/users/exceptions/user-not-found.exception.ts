import { NotFoundException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
    constructor(id?: number) {
        super(id ? `User with id ${id} not found` : 'User not found')
    }
}
