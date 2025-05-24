import { Injectable } from '@nestjs/common'
import { SuccessResponseDto } from '@src/users/dto/success-response.dto'
import { UserNotFoundException } from '@src/users/exceptions/user-not-found.exception'
import { UsersRepository } from '@src/users/users.repository'
import { UsersEntity } from '@src/users/entities/users.entity'

import { ArticlesRepository } from './articles.repository'
import { ArticleEntity } from './entities/articles.entity'
import { CreateArticleDto } from './dto/create-article.dto'

@Injectable()
export class ArticlesService {
    constructor(
        private readonly articlesRepository: ArticlesRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async createArticle(
        currentUserId: number,
        userData: CreateArticleDto,
    ): Promise<SuccessResponseDto> {
        const author = await this.usersRepository.findById(currentUserId)

        if (!author) {
            throw new UserNotFoundException(currentUserId)
        }

        const newArticle = new ArticleEntity()
        Object.assign(newArticle, { ...userData, author: author })

        const id = await this.articlesRepository.createAndSave(newArticle)

        return { id }
    }

    async findAll(): Promise<ArticleEntity[]> {
        const articles = await this.articlesRepository.findAll()

        articles.map((article) => {
            ;(article.author as Pick<UsersEntity, 'id' | 'username'>) = {
                id: article.author.id,
                username: article.author.username,
            }
        })

        return articles
    }

    // async findById(id: number): Promise<UserResponseDto> {
    //     const user = await this.articlesRepository.findById(id)
    //     if (!user) {
    //         throw new UserNotFoundException(id)
    //     }
    //     return user
    // }

    // async updateUser(
    //     id: number,
    //     updateData: UpdateUserDto,
    // ): Promise<SuccessResponseDto> {
    //     const status = await this.usersRepository.updateById(id, updateData)
    //     if (status.affected === 0) {
    //         throw new UserNotFoundException(id)
    //     }
    //     return { id }
    // }

    async deleteArticle(id: number): Promise<SuccessResponseDto> {
        const status = await this.usersRepository.deleteById(id)
        if (status.affected === 0) {
            throw new UserNotFoundException(id)
        }
        return { id }
    }
}
