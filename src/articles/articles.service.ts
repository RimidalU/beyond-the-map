import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@src/users/users.repository'
import { UsersEntity } from '@src/users/entities/users.entity'

import { ArticlesRepository } from './articles.repository'
import { ArticleEntity } from './entities/articles.entity'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleNotFoundException } from './exceptions/article-not-found.exception'
import { SuccessResponseDto } from './dto/success-response.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { InvalidAuthorIdException } from './exceptions/invalid-author-id.exception'
import { QueryInterface } from './types/query.interface'

@Injectable()
export class ArticlesService {
    constructor(
        private readonly articlesRepository: ArticlesRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async createArticle(
        currentUserId: number,
        articleData: CreateArticleDto,
    ): Promise<SuccessResponseDto> {
        const author = await this.usersRepository.findById(currentUserId)

        if (!author) {
            throw new InvalidAuthorIdException()
        }

        const newArticle = new ArticleEntity()
        Object.assign(newArticle, { ...articleData, author: author })

        const id = await this.articlesRepository.createAndSave(newArticle)

        return { id }
    }

    async findAll(query: QueryInterface): Promise<ArticleEntity[]> {
        const articles = await this.articlesRepository.findAll(query)

        articles.map((article) => {
            ;(article.author as Pick<UsersEntity, 'id' | 'username'>) = {
                id: article.author.id,
                username: article.author.username,
            }
        })

        return articles
    }

    async findById(id: number): Promise<ArticleEntity> {
        const article = await this.articlesRepository.findById(id)
        if (!article) {
            throw new ArticleNotFoundException(id)
        }

        ;(article.author as Pick<UsersEntity, 'id' | 'username'>) = {
            id: article.author.id,
            username: article.author.username,
        }

        return article
    }

    async updateArticle(
        id: number,
        updateData: UpdateArticleDto,
    ): Promise<SuccessResponseDto> {
        const status = await this.articlesRepository.updateById(id, updateData)
        if (status.affected === 0) {
            throw new ArticleNotFoundException(id)
        }
        return { id }
    }

    async deleteArticle(id: number): Promise<SuccessResponseDto> {
        const status = await this.articlesRepository.deleteById(id)
        if (status.affected === 0) {
            throw new ArticleNotFoundException(id)
        }
        return { id }
    }
}
