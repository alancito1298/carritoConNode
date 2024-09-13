'use client'
import { useState } from 'react';

const PanelAgregarProducto = ({ onAddProduct }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  //const [detalle, setDetalle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Valida que los campos no estén vacíos
    if (!nombre || !precio) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const nuevoProducto = {
      id: Date.now(),  // Puedes generar un ID o manejarlo como prefieras
      nombre,
      precio: parseFloat(precio),
    };
  
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
  
      // Llama a la función para agregar el producto a la lista local
      onAddProduct(nuevoProducto);
  
      // Limpia los campos después de enviar
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error('Error al enviar el producto:', error);
      alert('Hubo un error al agregar el producto.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre del Producto</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="text-indigo-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:text-blue-600 focus:border-indigo-500 sm:text-sm"
          required
          
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-indigo-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
 {/*
          También podemos tener
          comentarios multilínea
     
<div>
        <label className="block text-sm font-medium">detalle</label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-indigo-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div> */}

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