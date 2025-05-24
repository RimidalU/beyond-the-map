import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, VersioningType } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('MainApplication')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v',
    })

    const config = app.get(ConfigService)

    const port = config.get<number>('PORT') ?? 3000

    await app.listen(port, () =>
        logger.log(`Server is listening on port ${port}`),
    )
}

bootstrap()
