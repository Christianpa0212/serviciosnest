import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sales.css';

function Sales() {
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newSale, setNewSale] = useState({ vendedorId: '', productos: [], totalVenta: 0 });

  useEffect(() => {
    fetchSales();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3003/sales');
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
      alert("Error al obtener las ventas.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error al obtener los usuarios.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error al obtener los productos.");
    }
  };

  const handleAddProductToSale = (productId, cantidad) => {
    const product = products.find(p => p._id === productId);
    if (product && cantidad > 0) {
      setNewSale(prevState => ({
        ...prevState,
        productos: [
          ...prevState.productos,
          { productId: product._id, nombreProducto: product.nombreProducto, cantidad }
        ],
        totalVenta: prevState.totalVenta + (product.precio * cantidad)
      }));
    }
  };

  const handleAddSale = async () => {
    try {
      if (!newSale.vendedorId || newSale.productos.length === 0) {
        alert("Por favor selecciona un vendedor y al menos un producto.");
        return;
      }
  
      await axios.post('http://localhost:3003/sales', newSale);
      fetchSales();
      setNewSale({ vendedorId: '', productos: [], totalVenta: 0 });
      alert("Venta agregada exitosamente");
    } catch (error) {
      console.error('Error al agregar venta:', error.response || error);
      alert('Hubo un problema al agregar la venta.');
    }
  };
  

  return (
    <div className="sales-container">
      <h2>Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Vendedor</th>
            <th>Productos Vendidos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale._id}>
              <td>{sale._id}</td>
              <td>{users.find(user => user._id === sale.vendedorId)?.name || "Usuario no encontrado"}</td>
              <td>
                {sale.productos.map((producto, index) => (
                  <div key={index}>
                    {producto.nombreProducto} - Cantidad: {producto.cantidad}
                  </div>
                ))}
              </td>
              <td>${sale.totalVenta}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar Venta</h3>
      <div className="form-group">
        <label>Vendedor:</label>
        <select
          value={newSale.vendedorId}
          onChange={e => setNewSale({ ...newSale, vendedorId: e.target.value })}
        >
          <option value="">Selecciona un vendedor</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} {user.paterno} {user.materno}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Producto:</label>
        <select id="productSelect">
          <option value="">Selecciona un producto</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>
              {product.nombreProducto} - ${product.precio}
            </option>
          ))}
        </select>
        <input
          type="number"
          id="productQuantity"
          placeholder="Cantidad"
          min="1"
        />
        <button
          onClick={() => {
            const productId = document.getElementById('productSelect').value;
            const cantidad = parseInt(document.getElementById('productQuantity').value, 10);
            handleAddProductToSale(productId, cantidad);
          }}
        >
          Añadir Producto
        </button>
      </div>

      <div>
        <p>Total Venta: ${newSale.totalVenta}</p>
        <button onClick={handleAddSale}>Agregar Venta</button>
      </div>
    </div>
  );
}

export default Sales;
