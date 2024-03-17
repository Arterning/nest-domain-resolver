import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './entities/domain.entity';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { ToolsController } from './tools.controller';
import { HistoryController } from './history.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }])],
  controllers: [DomainController, ToolsController, HistoryController],
  providers: [DomainService],
})
export class DomainModule {}
