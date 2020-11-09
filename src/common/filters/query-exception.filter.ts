/* HttpExceptionFilter final code */
import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryFailedErrorFilter<T extends QueryFailedError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const name = exception.name;
    const status = exception.message;


    response.json({
      statusCode: status,
      name,
      status,
      timestamp: new Date().toISOString(),
    });
  }
}