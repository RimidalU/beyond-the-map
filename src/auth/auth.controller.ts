import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {}
