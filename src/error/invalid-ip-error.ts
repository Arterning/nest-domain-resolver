import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIpException extends HttpException {
  constructor() {
    super("Ip is invalid", HttpStatus.BAD_REQUEST);
  }
}