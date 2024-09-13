'use client';

import React, { useEffect, useState } from 'react';
import PanelAgregarProducto from '@/panelAgregarProducto';

function ProductosTabla() {
  const [productos, setProductos] = useState([]);

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data.productos);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Función para agregar un nuevo producto
  const handleAddProduct = async (nuevoProducto) => {
    // Agregar el nuevo producto al estado local
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);

    // Lógica para enviar el nuevo producto a la API
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      console.log('Producto agregado con éxito');
    } catch (error) {
      console.error('Error al enviar el producto:', error);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id !== id)
        );
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className="p-0">
      <h3 className="text-center bg-indigo-600 uppercase">Panel de Administrador</h3>

      {/* Panel para agregar un nuevo producto */}
      <div className="my-4">
        <PanelAgregarProducto onAddProduct={handleAddProduct} />
      </div>

      {/* Tabla de productos */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${Number.isFinite(producto.precio) ? producto.precio.toFixed(2) : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600">Act</button>
                <button onClick={() => handleDelete(producto.id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 ml-2">Eli</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosTabla;
