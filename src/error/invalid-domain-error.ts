import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDomainException extends HttpException {
  constructor() {
    super("Domain is invalid", HttpStatus.BAD_REQUEST);
  }
}