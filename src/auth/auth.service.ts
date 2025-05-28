import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@src/users/users.service'
import * as bcrypt from 'bcrypt'

import { UserValidatedType } from './types/user.type'
import { ValidateUserDto } from './dto/validate-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser({
        email,
        password,
    }: ValidateUserDto): Promise<UserValidatedType | null> {
        const user = await this.usersService.findByEmail(email)

        if (user && (await bcrypt.compare(password, user.password))) {
            const returnedUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
                articles: user.articles,
            }
            return returnedUser
        }
        return null
    }

    login(user: UserValidatedType) {
        const payload = { id: user.id, name: user.username, email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
