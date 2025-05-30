import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard'
import { CacheInterceptor } from '@nestjs/cache-manager'

import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleEntity } from './entities/articles.entity'
import { UpdateArticleDto } from './dto/update-article.dto'
import { SuccessResponseDto } from './dto/success-response.dto'
import { CreateSwaggerDecorator } from './decorators/create-swagger.decorator'
import { FindAllSwaggerDecorator } from './decorators/find-all-swagger.decorator'
import { FindArticleByIdSwaggerDecorator } from './decorators/find-article-by-id-swagger.decorator'
import { RemoveSwaggerDecorator } from './decorators/remove-swagger.decorator'
import { UpdateSwaggerDecorator } from './decorators/update-swagger.decorator'
import { QueryInterface } from './types/query.interface'

@Controller('articles')
@ApiTags('Articles routes')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @CreateSwaggerDecorator()
    async create(
        @Body() articleData: CreateArticleDto,
    ): Promise<SuccessResponseDto> {
        return this.articlesService.createArticle(24, articleData)
    }

    @Get()
    @FindAllSwaggerDecorator()
    @UseInterceptors(CacheInterceptor)
    async findAll(@Query() query: QueryInterface): Promise<ArticleEntity[]> {
        return this.articlesService.findAll(query)
    }

    @Get(':id')
    @FindArticleByIdSwaggerDecorator()
    @UseInterceptors(CacheInterceptor)
    async findOne(@Param('id') id: string): Promise<ArticleEntity> {
        return await this.articlesService.findById(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UpdateSwaggerDecorator()
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateArticleDto,
    ): Promise<SuccessResponseDto> {
        return await this.articlesService.updateArticle(+id, updateData)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @RemoveSwaggerDecorator()
    async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
        return await this.articlesService.deleteArticle(+id)
    }
}
