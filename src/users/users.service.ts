import { Injectable } from '@nestjs/common'

import { UsersEntity } from './entities/users.entity'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(userData: CreateUserDto): Promise<{ userId: number }> {
        const newUser = new UsersEntity()
        Object.assign(newUser, userData)

        const userId = await this.usersRepository.createAndSave(newUser)

        return { userId }
    }

    async findAll(): Promise<UsersEntity[]> {
        return this.usersRepository.findAll()
    }

    async findById(id: number): Promise<UsersEntity | null> {
        return this.usersRepository.findById(id)
    }

    async updateUser(
        id: number,
        updateData: UpdateUserDto,
    ): Promise<UsersEntity | null> {
        return this.usersRepository.updateById(id, updateData)
    }

    async deleteUser(id: number): Promise<void> {
        await this.usersRepository.deleteById(id)
    }
}
