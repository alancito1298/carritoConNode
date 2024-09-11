'use client';

import React, { useEffect, useState } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cargar el carrito desde el localStorage
      const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(carritoLocal);
    }
  }, []);

  const eliminarProducto = (id) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoActualizado = carritoActual.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    setCarrito(carritoActualizado);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Carrito de Compras</h2>

        <div className="mt-6">
          {carrito.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {carrito.map((producto) => (
                
                <div key={producto.id} className="group relative border p-4 rounded-md shadow-md">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                  
                    <img
                      src={producto.imageSrc}
                      alt={producto.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm text-gray-700">{producto.nombre}</h3>
                      <p className="mt-1 text-sm text-gray-500">{producto.color}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">Cantidad: {producto.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{producto.precio}</p>
                    <button className="ml-2 bg-red-600 text-black px-2 py-1 rounded">-</button>
                    <button
                      className="ml-2 bg-red-600  px-2 py-1 rounded"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                    <button className="ml-2 bg-green-500 text-black px-2 py-1 rounded"> +</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrito;