import { CacheModuleOptions } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const getCacheModuleConfig = async (
    configService: ConfigService,
    // eslint-disable-next-line
): Promise<CacheModuleOptions> => {
    return {
        ttl: configService.get<number>('CACHE_TTL', DEFAULT_CACHE_TTL),
        isGlobal: false,
    }
}
