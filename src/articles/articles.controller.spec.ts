import { Test, TestingModule } from '@nestjs/testing'

import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { ArticleEntity } from './entities/articles.entity'
import { UpdateArticleDto } from './dto/update-article.dto'
import { QueryInterface } from './types/query.interface'

describe('ArticlesController', () => {
    let controller: ArticlesController
    let articlesService: ArticlesService

    const mockArticle = {
        id: 1,
        title: 'Test',
        locality_name: 'Test Locality',
    } as ArticleEntity
    const mockSuccessResponse = { success: true }
    const mockArticles = [mockArticle]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArticlesController],
            providers: [
                {
                    provide: ArticlesService,
                    useValue: {
                        createArticle: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                        findAll: jest.fn().mockResolvedValue(mockArticles),
                        findById: jest.fn().mockResolvedValue(mockArticle),
                        updateArticle: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                        deleteArticle: jest
                            .fn()
                            .mockResolvedValue(mockSuccessResponse),
                    },
                },
            ],
        }).compile()

        controller = module.get<ArticlesController>(ArticlesController)
        articlesService = module.get<ArticlesService>(ArticlesService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('create', () => {
        it('should call articlesService.createArticle with correct parameters', async () => {
            const articleData: CreateArticleDto = {
                title: 'Test',
                locality_name: 'Test Locality',
                description: 'Test Description',
                is_local: true,
            }
            await controller.create(articleData)
            expect(articlesService.createArticle).toHaveBeenCalledWith(
                24,
                articleData,
            )
        })
    })

    describe('findAll', () => {
        it('should call articlesService.findAll with query params', async () => {
            const query: QueryInterface = { limit: 10, offset: 0 }
            const result = await controller.findAll(query)
            expect(articlesService.findAll).toHaveBeenCalledWith(query)
            expect(result).toEqual(mockArticles)
        })
    })

    describe('findOne', () => {
        it('should call articlesService.findById with id', async () => {
            const id = '1'
            const result = await controller.findOne(id)
            expect(articlesService.findById).toHaveBeenCalledWith(Number(id))
            expect(result).toEqual(mockArticle)
        })
    })

    describe('update', () => {
        it('should call articlesService.updateArticle with id and data', async () => {
            const id = '1'
            const updateData: UpdateArticleDto = {
                title: 'Updated',
                locality_name: 'Updated Locality',
            }
            const result = await controller.update(id, updateData)
            expect(articlesService.updateArticle).toHaveBeenCalledWith(
                +id,
                updateData,
            )
            expect(result).toEqual(mockSuccessResponse)
        })
    })

    describe('remove', () => {
        it('should call articlesService.deleteArticle with id', async () => {
            const id = '1'
            const result = await controller.remove(id)
            expect(articlesService.deleteArticle).toHaveBeenCalledWith(+id)
            expect(result).toEqual(mockSuccessResponse)
        })
    })
})
