import { ConsoleLogger } from '@nestjs/common';

export class ReportLogger extends ConsoleLogger {
  verbose(message: string) {
    super.verbose.apply(this, arguments);
  }

  log(message: string) {
    super.log.apply(this, arguments);
  }

  debug(message: string) {
    super.debug.apply(this, arguments);
  }

  warn(message: string) {
    super.warn.apply(this, arguments);
  }

  error(message: string) {
    super.error.apply(this, arguments);
  }
}