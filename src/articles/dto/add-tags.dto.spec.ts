import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { AddTagsDto } from './add-tags.dto'

describe('AddTagsDto', () => {
    it('should allow valid array', async () => {
        const dto = plainToInstance(AddTagsDto, {
            tags: ['landmark', 'guide', 'local'],
        })
        const errors = await validate(dto)
        expect(errors).toHaveLength(0)
    })

    it('should not allow missing field', async () => {
        const dto = plainToInstance(AddTagsDto, {})
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('tags')
    })

    it('should not allow non-array value', async () => {
        const dto = plainToInstance(AddTagsDto, { tags: 'landmark' })
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('tags')
    })

    it('should not allow null', async () => {
        const dto = plainToInstance(AddTagsDto, { tags: null })
        const errors = await validate(dto)
        expect(errors).toHaveLength(1)
        expect(errors[0].property).toEqual('tags')
    })
})
