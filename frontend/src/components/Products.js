// src/components/Products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombreProducto: '', precio: 0, cantidadExistencia: 0 });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3002/products');
    setProducts(response.data);
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:3002/products', newProduct);
    fetchProducts();
    setNewProduct({ nombreProducto: '', precio: 0, cantidadExistencia: 0 });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ nombreProducto: product.nombreProducto, precio: product.precio, cantidadExistencia: product.cantidadExistencia });
  };

  const handleUpdateProduct = async () => {
    await axios.patch(`http://localhost:3002/products/${editingProduct._id}`, newProduct); // Cambiado a PATCH
    fetchProducts();
    setEditingProduct(null);
    setNewProduct({ nombreProducto: '', precio: 0, cantidadExistencia: 0 });
  };

  const handleDeleteProduct = async (productId) => {
    await axios.delete(`http://localhost:3002/products/${productId}`);
    fetchProducts();
  };

  return (
    <div className="product-container">
      <h2>Inventario</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.nombreProducto}</td>
              <td>{product.cantidadExistencia}</td>
              <td>${product.precio}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditProduct(product)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <div className="product-form">
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={newProduct.nombreProducto}
          onChange={e => setNewProduct({ ...newProduct, nombreProducto: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={e => setNewProduct({ ...newProduct, precio: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newProduct.cantidadExistencia}
          onChange={e => setNewProduct({ ...newProduct, cantidadExistencia: +e.target.value })}
        />
        <button className="submit-btn" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
          {editingProduct ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}

export default Products;
