import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Optional: makes config available everywhere
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Optional: use specific env file
    }),
    MongooseModule.forRoot(process.env.MONGO_URL ?? ''),
    TaskModule,
  ],
})
export class AppModule {}
