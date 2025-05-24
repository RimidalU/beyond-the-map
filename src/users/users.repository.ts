import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UNIQUE_VIOLATION_CODE } from '@src/constants/typeorm.constnts'
import { TypeOrmError } from '@src/types/typeorm.types'

import { UsersEntity } from './entities/users.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DatabaseError } from './exceptions/database-error.exception'
import { UserCannotBeCreated } from './exceptions/user-cannot-be-created.exception'

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
                throw new DatabaseError()
            }
        }
    }

    async findAll(): Promise<UsersEntity[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<UsersEntity | null> {
        return this.repo.findOneBy({ id })
    }

    async updateById(
        id: number,
        updateData: UpdateUserDto,
    ): Promise<UsersEntity | null> {
        await this.repo.update(id, updateData)
        return this.findById(id) ?? null
    }

    async deleteById(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
