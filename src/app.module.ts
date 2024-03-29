import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from './domain/domain.module';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';


@Module({
  imports: [
    GracefulShutdownModule.forRoot({
      cleanup: () => {
        const consoleLogger = new ConsoleLogger();
        consoleLogger.setContext('GracefulShutdown');
        consoleLogger.log('Gracefully shutting down the server...');
      },
      gracefulShutdownTimeout: 5000,
      keepNodeProcessAlive: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_URL,
        };
      },
    }),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
