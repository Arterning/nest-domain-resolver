import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from './domain/domain.module';
import mongodbConfig from './configs/mongodb.config';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';


@Module({
  imports: [
    GracefulShutdownModule.forRoot({
      cleanup: () => console.log('cleanup'),
      gracefulShutdownTimeout: 5000,
      keepNodeProcessAlive: true,
    }),
    MongooseModule.forRoot(mongodbConfig.uri),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
