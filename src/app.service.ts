import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, any> {
    const response = {
      version: process.env.APP_VERSION || "0.1.0",
      date: new Date().getTime(),
      kubernetes: !!process.env.KUBERNETES_SERVICE_HOST
    }
    return response;
  }
}
