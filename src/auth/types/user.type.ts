import { UsersEntity } from '@src/users/entities/users.entity'

type UserValidatedType = Omit<
    UsersEntity,
    'password' | 'hashPassword' | 'updated_at'
>

export type { UserValidatedType }
