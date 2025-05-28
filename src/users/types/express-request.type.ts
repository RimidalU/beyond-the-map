import { Request } from 'express'

import { UsersEntity } from '../entities/users.entity'

export type ExpressRequestType = Request & { user?: Partial<UsersEntity> }
