import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersEntity } from '@src/users/entities/users.entity'
import { UsersRepository } from '@src/users/users.repository'

import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { ArticleEntity } from './entities/articles.entity'
import { ArticlesRepository } from './articles.repository'

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UsersEntity])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository, UsersRepository],
})
export class ArticlesModule {}
