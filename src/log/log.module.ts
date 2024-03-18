import { Module } from '@nestjs/common';
import { ReportLogger } from './report-log';

@Module({
  providers: [ReportLogger],
  exports: [ReportLogger],
})
export class LogModule {}