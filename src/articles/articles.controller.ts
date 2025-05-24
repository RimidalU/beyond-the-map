import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { SuccessResponseDto } from '@src/users/dto/success-response.dto'

import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleEntity } from './entities/articles.entity'

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    // @CreateSwaggerDecorator()
    async create(
        // @UserInfo('id') currentUserId: number,
        @Body() userData: CreateArticleDto,
    ): Promise<SuccessResponseDto> {
        return this.articlesService.createArticle(24, userData)
    }

    @Get()
    // @FindAllSwaggerDecorator()
    async findAll(): Promise<ArticleEntity[]> {
        return this.articlesService.findAll()
    }

    // @Get(':id')
    // @FindUserByIdSwaggerDecorator()
    // async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    //     return await this.articlesService.findById(+id)
    // }

    // @Put(':id')
    // @UpdateSwaggerDecorator()
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateData: UpdateUserDto,
    // ): Promise<SuccessResponseDto> {
    //     return await this.articlesService.updateUser(+id, updateData)
    // }

    @Delete(':id')
    // @RemoveSwaggerDecorator()
    async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
        return await this.articlesService.deleteArticle(+id)
    }
}
