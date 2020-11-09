import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { environment: process.env.NODE_ENV };
  }
}
