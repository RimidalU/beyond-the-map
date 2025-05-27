import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult, DeleteResult } from 'typeorm'

import { ArticlesRepository } from './articles.repository'
import { ArticleEntity } from './entities/articles.entity'
import { InternalServerError } from './exceptions/internal-server-error.exception'
import { QueryInterface } from './types/query.interface'

describe('ArticlesRepository', () => {
    let repository: ArticlesRepository
    let repo: Repository<ArticleEntity>

    const mockArticle = { id: 1, title: 'Test' } as ArticleEntity

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticlesRepository,
                {
                    provide: getRepositoryToken(ArticleEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(mockArticle),
                        createQueryBuilder: jest.fn(() => ({
                            leftJoinAndSelect: jest.fn().mockReturnThis(),
                            andWhere: jest.fn().mockReturnThis(),
                            skip: jest.fn().mockReturnThis(),
                            take: jest.fn().mockReturnThis(),
                            orderBy: jest.fn().mockReturnThis(),
                            getMany: jest.fn().mockResolvedValue([mockArticle]),
                        })),
                        findOneBy: jest.fn().mockResolvedValue(mockArticle),
                        update: jest.fn().mockResolvedValue({
                            affected: 1,
                            raw: [],
                            generatedMaps: [],
                        } as UpdateResult),
                        delete: jest.fn().mockResolvedValue({
                            affected: 1,
                            raw: [],
                        } as DeleteResult),
                    },
                },
            ],
        }).compile()

        repository = module.get<ArticlesRepository>(ArticlesRepository)
        repo = module.get<Repository<ArticleEntity>>(
            getRepositoryToken(ArticleEntity),
        )
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    describe('createAndSave', () => {
        it('should save article and return id', async () => {
            const result = await repository.createAndSave(mockArticle)
            expect(result).toEqual(mockArticle.id)
            expect(repo.save).toHaveBeenCalledWith(mockArticle)
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error())
            await expect(repository.createAndSave(mockArticle)).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('findAll', () => {
        it('should return articles with query', async () => {
            const query: QueryInterface = { limit: 10, offset: 0 }
            const result = await repository.findAll(query)
            expect(result).toEqual([mockArticle])
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'createQueryBuilder').mockImplementationOnce(
                () => {
                    throw new Error()
                },
            )
            await expect(repository.findAll({})).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('findById', () => {
        it('should return article by id', async () => {
            const result = await repository.findById(mockArticle.id)
            expect(result).toEqual(mockArticle)
            expect(repo.findOneBy).toHaveBeenCalledWith({ id: mockArticle.id })
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'findOneBy').mockRejectedValueOnce(
                new InternalServerError(),
            )
            await expect(repository.findById(mockArticle.id)).rejects.toThrow(
                InternalServerError,
            )
        })
    })

    describe('updateById', () => {
        it('should update article and return UpdateResult', async () => {
            const updateData = { title: 'Updated' }
            const result = await repository.updateById(
                mockArticle.id,
                updateData,
            )
            expect(result).toEqual({ affected: 1, raw: [], generatedMaps: [] })
            expect(repo.update).toHaveBeenCalledWith(mockArticle.id, updateData)
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error())
            await expect(
                repository.updateById(mockArticle.id, {}),
            ).rejects.toThrow(InternalServerError)
        })
    })

    describe('deleteById', () => {
        it('should delete article and return DeleteResult', async () => {
            const result = await repository.deleteById(mockArticle.id)
            expect(result).toEqual({ affected: 1, raw: [] })
            expect(repo.delete).toHaveBeenCalledWith(mockArticle.id)
        })

        it('should throw InternalServerError on error', async () => {
            jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error())
            await expect(repository.deleteById(mockArticle.id)).rejects.toThrow(
                InternalServerError,
            )
        })
    })
})
