import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleEntity } from './entities/articles.entity'
import { UpdateArticleDto } from './dto/update-article.dto'
import { SuccessResponseDto } from './dto/success-response.dto'
import { CreateSwaggerDecorator } from './decorators/create-swagger.decorator'

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @CreateSwaggerDecorator()
    async create(
        // @UserInfo('id') currentUserId: number,
        @Body() articleData: CreateArticleDto,
    ): Promise<SuccessResponseDto> {
        return this.articlesService.createArticle(111, articleData)
    }

    @Get()
    // @FindAllSwaggerDecorator()
    async findAll(): Promise<ArticleEntity[]> {
        return this.articlesService.findAll()
    }

    @Get(':id')
    // @FindUserByIdSwaggerDecorator()
    async findOne(@Param('id') id: string): Promise<ArticleEntity> {
        return await this.articlesService.findById(+id)
    }

    @Put(':id')
    // @UpdateSwaggerDecorator()
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateArticleDto,
    ): Promise<SuccessResponseDto> {
        return await this.articlesService.updateArticle(+id, updateData)
    }

    @Delete(':id')
    // @RemoveSwaggerDecorator()
    async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
        return await this.articlesService.deleteArticle(+id)
    }
}
