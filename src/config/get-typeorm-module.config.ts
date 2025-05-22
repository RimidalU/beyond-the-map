import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeormModuleConfig = async (
    configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
    return {
        type: configService.getOrThrow<'postgres'>('TYPEORM_CONNECTION'),
        username: configService.getOrThrow<string>('DATABASE_USER'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        entities: [__dirname + '../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,js}'],
        synchronize: false,
        autoLoadEntities: true,
        useUTC: true,
        ssl: configService.getOrThrow<string>('NODE_ENV') === 'development',
    }
}
