import { Injectable, Logger } from '@nestjs/common'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ArticleEntity } from './entities/articles.entity'
import { InternalServerError } from './exceptions/internal-server-error.exception'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticlesRepository {
    private readonly logger = new Logger(ArticlesRepository.name)

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly repo: Repository<ArticleEntity>,
    ) {}

    async createAndSave(articleEntityData: ArticleEntity): Promise<number> {
        try {
            const article = await this.repo.save(articleEntityData)
            return article.id
        } catch (error) {
            this.logger.error('Error on creating article', error)
            throw new InternalServerError()
        }
    }

    async findAll(): Promise<ArticleEntity[]> {
        try {
            return this.repo.find()
        } catch (error) {
            this.logger.error('Error on finding all Article', error)
            throw new InternalServerError()
        }
    }

    async findById(id: number): Promise<ArticleEntity | null> {
        try {
            return this.repo.findOneBy({ id })
        } catch (error) {
            this.logger.error('Error on find article by id', error)
            throw new InternalServerError()
        }
    }

    async updateById(
        id: number,
        updateData: UpdateArticleDto,
    ): Promise<UpdateResult> {
        try {
            return await this.repo.update(id, updateData)
        } catch (error) {
            this.logger.error('Error on update article', error)
            throw new InternalServerError()
        }
    }

    async deleteById(id: number): Promise<DeleteResult> {
        try {
            return await this.repo.delete(id)
        } catch (error) {
            this.logger.error('Error on delete article', error)
            throw new InternalServerError()
        }
    }
}
