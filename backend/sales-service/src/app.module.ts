// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sales-service'),
    SalesModule,
  ],
})
export class AppModule {}
