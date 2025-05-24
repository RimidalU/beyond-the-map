import { Injectable } from '@nestjs/common'

import { UsersEntity } from './entities/users.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findAll(): Promise<UsersEntity[]> {
        return this.usersRepository.findAll()
    }

    async findById(id: number): Promise<UsersEntity | null> {
        return this.usersRepository.findById(id)
    }

    async createUser(userData: Partial<UsersEntity>): Promise<UsersEntity> {
        return this.usersRepository.createAndSave(userData)
    }

    async updateUser(
        id: number,
        updateData: Partial<UsersEntity>,
    ): Promise<UsersEntity | null> {
        return this.usersRepository.updateById(id, updateData)
    }

    async deleteUser(id: number): Promise<void> {
        await this.usersRepository.deleteById(id)
    }
}
