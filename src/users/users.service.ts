import { Injectable } from '@nestjs/common'

import { UsersEntity } from './entities/users.entity'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { SuccessResponseDto } from './dto/success-response.dto'
import { UserResponseDto } from './dto/user.response.dto'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(userData: CreateUserDto): Promise<SuccessResponseDto> {
        const newUser = new UsersEntity()
        Object.assign(newUser, userData)

        const id = await this.usersRepository.createAndSave(newUser)

        return { id }
    }

    async findAll(): Promise<UserResponseDto[]> {
        return this.usersRepository.findAll()
    }

    async findById(id: number): Promise<UsersEntity> {
        const user = await this.usersRepository.findById(id)
        if (!user) {
            throw new UserNotFoundException(id)
        }
        return user
    }

    async updateUser(
        id: number,
        updateData: UpdateUserDto,
    ): Promise<UsersEntity | null> {
        return this.usersRepository.updateById(id, updateData)
    }

    async deleteUser(id: number): Promise<SuccessResponseDto> {
        const status = await this.usersRepository.deleteById(id)
        if (status.affected === 0) {
            throw new UserNotFoundException(id)
        }
        return { id }
    }
}
