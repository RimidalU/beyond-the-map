import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersEntity } from '@src/users/entities/users.entity'
import { UsersRepository } from '@src/users/users.repository'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getCacheModuleConfig } from '@src/config/get-cache-module.config'

import { ArticlesService } from './articles.service'
import { ArticleEntity } from './entities/articles.entity'
import { ArticlesRepository } from './articles.repository'
import { ArticlesController } from './articles.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, UsersEntity]),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getCacheModuleConfig,
        }),
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository, UsersRepository],
})
export class ArticlesModule {}
