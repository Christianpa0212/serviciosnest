// src/sales/sales.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sales.schema';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() saleData: Partial<Sale>): Promise<Sale> {
    return this.salesService.create(saleData);
  }

  @Get()
  findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sale | null> {
    return this.salesService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.salesService.remove(id);
  }
}
