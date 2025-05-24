import { Injectable, Logger } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmError } from '@src/types/typeorm.types'
import { UNIQUE_VIOLATION_CODE } from '@src/constants/typeorm.constants'

import { UsersEntity } from './entities/users.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InternalServerError } from './exceptions/internal-server-error.exception'
import { UserCannotBeCreated } from './exceptions/user-cannot-be-created.exception'
import { UserResponseDto } from './dto/user.response.dto'

@Injectable()
export class UsersRepository {
    private readonly logger = new Logger(UsersRepository.name)

    constructor(
        @InjectRepository(UsersEntity)
        private readonly repo: Repository<UsersEntity>,
    ) {}

    async createAndSave(UsersEntityData: CreateUserDto): Promise<number> {
        try {
            const user = await this.repo.save(UsersEntityData)
            return user.id
        } catch (error: unknown) {
            if ((error as TypeOrmError).code === UNIQUE_VIOLATION_CODE) {
                throw new UserCannotBeCreated(UsersEntityData.email)
            } else {
                this.logger.error('Error on creating user', error)
                throw new InternalServerError()
            }
        }
    }

    async findAll(): Promise<UserResponseDto[]> {
        try {
            return this.repo.find({
                select: {
                    id: true,
                    username: true,
                },
            })
        } catch (error) {
            this.logger.error('Error on finding all users', error)
            throw new InternalServerError()
        }
    }

    async findById(id: number): Promise<UsersEntity | null> {
        try {
            return this.repo.findOneBy({ id })
        } catch (error) {
            this.logger.error('Error on find user by id', error)
            throw new InternalServerError()
        }
    }

    async updateById(
        id: number,
        updateData: UpdateUserDto,
    ): Promise<UsersEntity | null> {
        try {
            await this.repo.update(id, updateData)
            return this.findById(id) ?? null
        } catch (error) {
            this.logger.error('Error on update user', error)
            throw new InternalServerError()
        }
    }

    async deleteById(id: number): Promise<DeleteResult> {
        try {
            return await this.repo.delete(id)
        } catch (error) {
            this.logger.error('Error on delete user', error)
            throw new InternalServerError()
        }
    }
}
