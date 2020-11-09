/* HttpExceptionFilter final code */
import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = {exceptionResponse}

    response.status(status).json({
      statusCode: status,
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}