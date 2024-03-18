import { HttpException, HttpStatus } from '@nestjs/common';

export class IpInvalidException extends HttpException {
  constructor() {
    super("Ip is invalid", HttpStatus.BAD_REQUEST);
  }
}