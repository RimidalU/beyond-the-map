import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { UsersEntity } from './entities/users.entity'

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly repo: Repository<UsersEntity>,
    ) {}

    async findAll(): Promise<UsersEntity[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<UsersEntity | null> {
        return this.repo.findOneBy({ id })
    }

    async createAndSave(
        UsersEntityData: Partial<UsersEntity>,
    ): Promise<UsersEntity> {
        const UsersEntity = this.repo.create(UsersEntityData)
        return this.repo.save(UsersEntity)
    }

    async updateById(
        id: number,
        updateData: Partial<UsersEntity>,
    ): Promise<UsersEntity | null> {
        await this.repo.update(id, updateData)
        return this.findById(id) ?? null
    }

    async deleteById(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
