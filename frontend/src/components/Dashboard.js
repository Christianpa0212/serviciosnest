// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Archivo CSS específico para este diseño

function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="navbar-title">Tienda de Electrónicos</span>
        </div>
        <ul className="navbar-links">
          <li><Link to="/sales">Ventas</Link></li>
          <li><Link to="/inventory">Inventario</Link></li>
          <li><Link to="/users">Usuarios</Link></li>
        </ul>
      </nav>

      {/* Sección Principal */}
      <section className="dashboard-body">
        <div className="card-container">
          <Link to="/users" className="card">
            <div className="card-content">
              <h3 className="card-heading">Usuarios</h3>
              <p>Registra, edita y elimina usuarios.</p>
            </div>
          </Link>
          <Link to="/inventory" className="card">
            <div className="card-content">
              <h3 className="card-heading">Inventario</h3>
              <p>Gestiona el inventario de productos.</p>
            </div>
          </Link>
          <Link to="/sales" className="card">
            <div className="card-content">
              <h3 className="card-heading">Ventas</h3>
              <p>Registra y administra las ventas.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
