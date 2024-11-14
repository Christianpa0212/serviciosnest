// src/sales/sales.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios'; // Importar desde @nestjs/axios
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale, SaleSchema } from './sales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    HttpModule, // Importar HttpModule aquí
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
