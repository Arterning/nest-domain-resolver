import { Controller, Get, HttpCode, Response } from '@nestjs/common';
import { AppService } from './app.service';
import {register, collectDefaultMetrics} from 'prom-client'
import { IpInvalidException } from './error/ip-invalid-error';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): Record<string, any> {
    return this.appService.getHello();
  }


  @Get('/health')
  @HttpCode(200)
  getHealth(@Response() res): string {
    return res.json({message: 'Ok'});
  }


  @Get('metrics')
  @HttpCode(200)
  async getMetrics(@Response() res) {
    const metrics = await register.metrics();
    res.setHeader('Content-Type', register.contentType);
    return res.send(metrics);
  }


  @Get('http-error')
  error() {
    throw new IpInvalidException();
  }


  @Get('simple-error')
  simpleError() {
    throw new Error('This is an error');
  }


}
