import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { UpdateUserDto } from './update-user.dto'

describe('update-user.dto', () => {
    let dto: { username?: unknown; email?: unknown; password?: unknown }
    const stringValue = 'string-value'
    const emailValue = 'user@email.com'
    const numberValue = 12

    beforeAll(() => {
        dto = {
            username: undefined,
            email: undefined,
            password: undefined,
        }
    })

    it('username field is omitted (allowed, because optional)', async () => {
        dto.username = undefined
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('username'),
        ).toBeFalsy()
    })

    it('username field is not string (not allowed, IsString)', async () => {
        dto.username = numberValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('username'),
        ).toBeTruthy()
    })

    it('username field is correct', async () => {
        dto.username = stringValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('username'),
        ).toBeFalsy()
    })

    it('email field is omitted (allowed, because optional)', async () => {
        dto.email = undefined
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('email')).toBeFalsy()
    })

    it('email field is not email (not allowed, IsEmail)', async () => {
        dto.email = stringValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('email')).toBeTruthy()
    })

    it('email field is correct', async () => {
        dto.email = emailValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(errors.map((err) => err.property).includes('email')).toBeFalsy()
    })

    it('password field is omitted (allowed, because optional)', async () => {
        dto.password = undefined
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('password'),
        ).toBeFalsy()
    })

    it('password field is not string (not allowed, IsString)', async () => {
        dto.password = numberValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('password'),
        ).toBeTruthy()
    })

    it('password field is correct', async () => {
        dto.password = stringValue
        const ofImportDTO = plainToInstance(UpdateUserDto, dto)
        const errors = await validate(ofImportDTO)
        expect(
            errors.map((err) => err.property).includes('password'),
        ).toBeFalsy()
    })
})
