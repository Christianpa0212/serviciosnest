// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // Crear producto
  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  // Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Obtener un producto por ID
  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  // Actualizar producto
  async update(id: string, updateData: Partial<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Eliminar producto
  async remove(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
