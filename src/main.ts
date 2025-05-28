import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { initSwagger } from '@src/app.swagger'

import { AppModule } from './app.module'
// import { HttpExtendedExceptionFilter } from './filters/HttpExtendedExceptionFilter' //TODO:refactor swagger

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // app.useGlobalFilters(new HttpExtendedExceptionFilter())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )

    const logger = new Logger('MainApplication')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'v',
    })

    const config = app.get(ConfigService)

    const port = config.get<number>('PORT') ?? 3000

    initSwagger(app)

    await app.listen(port, () =>
        logger.log(`Server is listening on port ${port}`),
    )
}

bootstrap()
