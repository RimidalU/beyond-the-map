import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = await app.get(ConfigService)

    console.log(config.get<number>('PORT'))

    const port = config.get<number>('PORT') ?? 3000

    await app.listen(port, () =>
        console.log(`Server is listening on port ${port}`),
    )
}

bootstrap()
