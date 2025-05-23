import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('MainApplication')

    const config = app.get(ConfigService)

    const port = config.get<number>('PORT') ?? 3000

    await app.listen(port, () =>
        logger.log(`Server is listening on port ${port}`),
    )
}

bootstrap()
