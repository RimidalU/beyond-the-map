import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtModuleConfig = async (
    configService: ConfigService,
    // eslint-disable-next-line
): Promise<JwtModuleOptions> => {
    return {
        secret: configService.getOrThrow<string>('JWT_CONSTANTS_SECRET'),
        signOptions: { expiresIn: '2d' },
    }
}
