import { Test, TestingModule } from '@nestjs/testing'
import { UsersRepository } from '@src/users/users.repository'
import { UsersEntity } from '@src/users/entities/users.entity'

import { ArticlesService } from './articles.service'
import { ArticlesRepository } from './articles.repository'
import { ArticleEntity } from './entities/articles.entity'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ArticleNotFoundException } from './exceptions/article-not-found.exception'
import { InvalidAuthorIdException } from './exceptions/invalid-author-id.exception'
import { QueryInterface } from './types/query.interface'

describe('ArticlesService', () => {
    let service: ArticlesService
    let articlesRepository: ArticlesRepository
    let usersRepository: UsersRepository

    const mockArticle = {
        id: 1,
        title: 'Test',
        locality_name: 'Test Locality',
        author: { id: 24, username: 'testuser' } as UsersEntity,
    } as ArticleEntity

    const mockAuthor = { id: 24, username: 'testuser' } as UsersEntity

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticlesService,
                {
                    provide: ArticlesRepository,
                    useValue: {
                        createAndSave: jest.fn().mockResolvedValue(1),
                        findAll: jest.fn().mockResolvedValue([mockArticle]),
                        findById: jest.fn().mockResolvedValue(mockArticle),
                        updateById: jest
                            .fn()
                            .mockResolvedValue({ affected: 1 }),
                        deleteById: jest
                            .fn()
                            .mockResolvedValue({ affected: 1 }),
                    },
                },
                {
                    provide: UsersRepository,
                    useValue: {
                        findById: jest.fn().mockResolvedValue(mockAuthor),
                    },
                },
            ],
        }).compile()

        service = module.get<ArticlesService>(ArticlesService)
        articlesRepository = module.get<ArticlesRepository>(ArticlesRepository)
        usersRepository = module.get<UsersRepository>(UsersRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('createArticle', () => {
        it('should create article and return id', async () => {
            const articleData: CreateArticleDto = {
                title: 'Test',
                locality_name: 'Test Locality',
                description: 'description',
                is_local: false,
            }
            const result = await service.createArticle(24, articleData)
            expect(result).toEqual({ id: 1 })
            expect(usersRepository.findById).toHaveBeenCalledWith(24)
            expect(articlesRepository.createAndSave).toHaveBeenCalled()
        })

        it('should throw if author not found', async () => {
            jest.spyOn(usersRepository, 'findById').mockResolvedValueOnce(null)
            const articleData: CreateArticleDto = {
                title: 'Test',
                locality_name: 'Test Locality',
                description: 'description',
                is_local: false,
            }
            await expect(
                service.createArticle(24, articleData),
            ).rejects.toThrow(InvalidAuthorIdException)
        })
    })

    describe('findAll', () => {
        it('should return articles with simplified author', async () => {
            const query: QueryInterface = { limit: 10, offset: 0 }
            const result = await service.findAll(query)
            expect(result).toEqual([
                {
                    ...mockArticle,
                    author: {
                        id: mockArticle.author.id,
                        username: mockArticle.author.username,
                    },
                },
            ])
            expect(articlesRepository.findAll).toHaveBeenCalledWith(query)
        })
    })

    describe('findById', () => {
        it('should return article with simplified author', async () => {
            const result = await service.findById(1)
            expect(result).toEqual({
                ...mockArticle,
                author: {
                    id: mockArticle.author.id,
                    username: mockArticle.author.username,
                },
            })
            expect(articlesRepository.findById).toHaveBeenCalledWith(1)
        })

        it('should throw if article not found', async () => {
            jest.spyOn(articlesRepository, 'findById').mockResolvedValueOnce(
                null,
            )
            await expect(service.findById(1)).rejects.toThrow(
                ArticleNotFoundException,
            )
        })
    })

    describe('updateArticle', () => {
        it('should update article and return id', async () => {
            const updateData: UpdateArticleDto = {
                title: 'Updated',
                locality_name: 'Updated Locality',
            }
            const result = await service.updateArticle(1, updateData)
            expect(result).toEqual({ id: 1 })
            expect(articlesRepository.updateById).toHaveBeenCalledWith(
                1,
                updateData,
            )
        })

        it('should throw if article not found', async () => {
            jest.spyOn(articlesRepository, 'updateById').mockResolvedValueOnce({
                affected: 0,
                raw: [],
                generatedMaps: [],
            })
            const updateData: UpdateArticleDto = {
                title: 'Updated',
                locality_name: 'Updated Locality',
            }
            await expect(service.updateArticle(1, updateData)).rejects.toThrow(
                ArticleNotFoundException,
            )
        })
    })

    describe('deleteArticle', () => {
        it('should delete article and return id', async () => {
            const result = await service.deleteArticle(1)
            expect(result).toEqual({ id: 1 })
            expect(articlesRepository.deleteById).toHaveBeenCalledWith(1)
        })

        it('should throw if article not found', async () => {
            jest.spyOn(articlesRepository, 'deleteById').mockResolvedValueOnce({
                affected: 0,
                raw: [],
            })
            await expect(service.deleteArticle(1)).rejects.toThrow(
                ArticleNotFoundException,
            )
        })
    })
})
