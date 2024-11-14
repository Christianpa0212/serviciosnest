// src/sales/sales.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './sales.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    private httpService: HttpService,
  ) {}

  // Crear venta
  async create(saleData: Partial<Sale>): Promise<Sale> {
    let totalVenta = 0;

    // Obtener los datos del vendedor
    const vendedorResponse = await this.httpService
      .get(`http://localhost:3001/users/${saleData.vendedorId}`)
      .toPromise()
      .catch(() => {
        throw new HttpException(
          'Vendedor no encontrado',
          HttpStatus.NOT_FOUND,
        );
      });

    const vendedorData = vendedorResponse.data;
    if (!vendedorData) {
      throw new HttpException('Vendedor no encontrado', HttpStatus.NOT_FOUND);
    }

    // Calcular el total de la venta y descontar inventario de cada producto
    for (const item of saleData.productos) {
      // Obtener el producto del servicio de productos
      const productResponse = await this.httpService
        .get(`http://localhost:3002/products/${item.productId}`)
        .toPromise();
      const productoData = productResponse.data;

      // Verificar si hay suficiente cantidad en existencia
      if (productoData.cantidadExistencia < item.cantidad) {
        throw new Error(`Cantidad insuficiente para el producto ${productoData.nombreProducto}`);
      }

      // Calcular el subtotal de cada producto
      totalVenta += productoData.precio * item.cantidad;

      // Descontar la cantidad en existencia en el servicio de productos
      await this.httpService
        .patch(`http://localhost:3002/products/${item.productId}`, {
          cantidadExistencia: productoData.cantidadExistencia - item.cantidad,
        })
        .toPromise();
    }

    // Crear la venta con el total calculado y el ID del vendedor
    const newSale = new this.saleModel({
      ...saleData,
      vendedorId: saleData.vendedorId, // Asociamos el ID del vendedor a la venta
      totalVenta,
    });

    return newSale.save();
  }

  // Obtener todas las ventas
  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  // Obtener una venta por ID
  async findOne(id: string): Promise<Sale | null> {
    return this.saleModel.findById(id).exec();
  }

  // Actualizar una venta
  async update(id: string, updateData: Partial<Sale>): Promise<Sale | null> {
    return this.saleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Eliminar una venta
  async remove(id: string): Promise<boolean> {
    const result = await this.saleModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
