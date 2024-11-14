// src/sales/sale.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sale extends Document {
  @Prop({ required: true })
  vendedorId: string; // ID del usuario/vendedor

  @Prop({ required: true, type: [{ productId: String, cantidad: Number }] })
  productos: { productId: string; cantidad: number }[]; // Array de productos con ID y cantidad

  @Prop({ required: true })
  totalVenta: number; // Total de la venta
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
