import { Keyv, createKeyv } from '@keyv/redis'
import { CacheModuleOptions } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'
import { CacheableMemory } from 'cacheable'

const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
const DEFAULT_CACHE_SIZE = 5000
const DEFAULT_CACHE_URL = 'redis://localhost:6379'

export const getKeyvModuleConfig = async (
    configService: ConfigService,
    // eslint-disable-next-line
): Promise<CacheModuleOptions> => {
    return {
        stores: [
            createKeyv(
                configService.get<string>('REDIS_URL', DEFAULT_CACHE_URL),
            ),
            new Keyv({
                store: new CacheableMemory({
                    ttl: configService.get<number>(
                        'CACHE_TTL',
                        DEFAULT_CACHE_TTL,
                    ),
                    lruSize: DEFAULT_CACHE_SIZE,
                }),
            }),
            new Keyv({
                store: new CacheableMemory({
                    ttl: configService.get<number>(
                        'CACHE_TTL',
                        DEFAULT_CACHE_TTL,
                    ),
                    lruSize: DEFAULT_CACHE_SIZE,
                }),
            }),
        ],
    }
}
