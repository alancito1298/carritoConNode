'use client'
import { useState } from 'react';

const PanelAgregarProducto = ({ onAddProduct }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [detalle, setDetalle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear el nuevo producto
    const nuevoProducto = {
      id: Date.now(),  // Generar un ID único temporalmente
      nombre,
      precio: parseFloat(precio),
      detalle,
    };

    // Llamar a la función pasada por props para agregar el producto
    onAddProduct(nuevoProducto);

    // Limpiar los campos del formulario
    setNombre('');
    setPrecio('');
    setDetalle('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre del Producto</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">detalle</label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default PanelAgregarProducto;