import {
    ExceptionFilter,
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ExpressRequestType } from '@src/users/types/express-request.type'
import { Response } from 'express'

@Catch()
export class HttpExtendedExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<ExpressRequestType>()
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.NOT_FOUND

        response.status(status).json({
            exception: {
                statusCode: status,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
                userInfo: {
                    id: request.user?.id ?? null,
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                payload: request.body,
            },
        })
    }
}
