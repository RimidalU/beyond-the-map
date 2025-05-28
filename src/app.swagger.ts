import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Beyond The Map')
        .addBearerAuth()
        .setDescription('"Beyond The Map" Server API')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('/docs', app, document)
}
