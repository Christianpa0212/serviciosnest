// src/products/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  nombreProducto: string;

  @Prop({ required: true })
  cantidadExistencia: number;

  @Prop({ required: true })
  precio: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
