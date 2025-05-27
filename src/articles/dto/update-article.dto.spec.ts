import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { UpdateArticleDto } from './update-article.dto'

describe('update-article.dto', () => {
    let dto: {
        title?: unknown
        description?: unknown
        is_local?: unknown
        locality_name?: unknown
    }
    const stringValue = 'string-value'
    const booleanValue = true
    const numberValue = 42

    beforeAll(() => {
        dto = {
            title: undefined,
            description: undefined,
            is_local: undefined,
            locality_name: undefined,
        }
    })

    it('title field is empty (allowed, because optional)', async () => {
        dto.title = ''
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('title')).toBeFalsy()
    })

    it('title field is not string (not allowed, IsString)', async () => {
        dto.title = numberValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('title')).toBeTruthy()
    })

    it('title field is correct', async () => {
        dto.title = stringValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('title')).toBeFalsy()
    })

    it('description field is empty (allowed, because optional)', async () => {
        dto.description = ''
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('description'),
        ).toBeFalsy()
    })

    it('description field is not string (not allowed, IsString)', async () => {
        dto.description = numberValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('description'),
        ).toBeTruthy()
    })

    it('description field is correct', async () => {
        dto.description = stringValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('description'),
        ).toBeFalsy()
    })

    it('is_local field is omitted (allowed, because optional)', async () => {
        dto.is_local = undefined
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('is_local'),
        ).toBeFalsy()
    })

    it('is_local field is not boolean (not allowed, IsBoolean)', async () => {
        dto.is_local = numberValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('is_local'),
        ).toBeTruthy()
    })

    it('is_local field is correct', async () => {
        dto.is_local = booleanValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('is_local'),
        ).toBeFalsy()
    })

    it('locality_name field is empty (allowed, because optional)', async () => {
        dto.locality_name = ''
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('locality_name'),
        ).toBeFalsy()
    })

    it('locality_name field is not string (not allowed, IsString)', async () => {
        dto.locality_name = numberValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('locality_name'),
        ).toBeTruthy()
    })

    it('locality_name field is correct', async () => {
        dto.locality_name = stringValue
        const ofImportDTO = plainToInstance(UpdateArticleDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('locality_name'),
        ).toBeFalsy()
    })
})
