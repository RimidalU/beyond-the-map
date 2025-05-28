import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { AddLandmarksUrlArticleDto } from './add-landmarks-url-article.dto'

describe('AddLandmarksUrlArticleDto', () => {
    it('should allow valid string', async () => {
        const dto = plainToInstance(AddLandmarksUrlArticleDto, {
            landmarks_url: 'https://example.com',
        })
        const errors = await validate(dto)
        expect(errors).toHaveLength(0)
    })

    it('should not allow empty string', async () => {
        const dto = plainToInstance(AddLandmarksUrlArticleDto, {
            landmarks_url: '',
        })
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('landmarks_url')
    })

    it('should not allow missing field', async () => {
        const dto = plainToInstance(AddLandmarksUrlArticleDto, {})
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('landmarks_url')
    })

    it('should not allow non-string value', async () => {
        const dto = plainToInstance(AddLandmarksUrlArticleDto, {
            landmarks_url: 123,
        })
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('landmarks_url')
    })

    it('should not allow null', async () => {
        const dto = plainToInstance(AddLandmarksUrlArticleDto, {
            landmarks_url: null,
        })
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('landmarks_url')
    })
})
