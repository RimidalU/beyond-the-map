import { Module } from '@nestjs/common'
import { UsersModule } from '@src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtModuleConfig } from '@src/config/get-jwt-module.config'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtModuleConfig,
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
