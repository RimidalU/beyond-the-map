import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { PublishedArticleDto } from './published-article.dto'

describe('published-article.dto', () => {
    let dto: { published_at?: unknown }
    const validDateString = '2025-05-24T12:00:00Z'
    const invalidDateString = 'not-a-date'
    const numberValue = 42

    beforeAll(() => {
        dto = {
            published_at: undefined,
        }
    })

    it('published_at field is omitted (allowed, because optional)', async () => {
        dto.published_at = undefined
        const ofImportDTO = plainToInstance(PublishedArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('published_at'),
        ).toBeFalsy()
    })

    it('published_at field is not a date string (not allowed, IsDateString)', async () => {
        dto.published_at = invalidDateString
        const ofImportDTO = plainToInstance(PublishedArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('published_at'),
        ).toBeTruthy()
    })

    it('published_at field is not a date string (number, not allowed, IsDateString)', async () => {
        dto.published_at = numberValue
        const ofImportDTO = plainToInstance(PublishedArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('published_at'),
        ).toBeTruthy()
    })

    it('published_at field is correct', async () => {
        dto.published_at = validDateString
        const ofImportDTO = plainToInstance(PublishedArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('published_at'),
        ).toBeFalsy()
    })
})
