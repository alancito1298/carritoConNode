'use client';

import React, { useEffect, useState } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Inicializa el carrito en el localStorage
    const iniciarCarrito = () => {
      if (typeof window !== 'undefined') {
        const carrito = localStorage.getItem('carrito');
        if (!carrito) {
          localStorage.setItem('carrito', JSON.stringify([])); // Inicializa el carrito como una lista vacía
        }
      }
    };

    iniciarCarrito();

    // Cargar los productos desde el archivo JSON en la carpeta public
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/Stock');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Productos cargados:', data.productos);
        setProductos(data.productos);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const agregarProducto = (producto) => {
    if (typeof window !== 'undefined') {
      // Obtén el carrito actual del localStorage
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      console.log('Carrito actual antes de agregar:', carrito);

      // Verifica si el producto ya está en el carrito
      const productoIndex = carrito.findIndex(item => item.id === producto.id);

      if (productoIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        carrito[productoIndex].quantity = (carrito[productoIndex].quantity || 1) + 1;
      } else {
        // Si el producto no está en el carrito, agrégalo
        carrito.push({ ...producto, quantity: 1 });
      }

      // Guarda el carrito actualizado en el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      console.log('Carrito actualizado:', carrito);
    }
  };

  const agregarAlCarrito = (producto) => {
    console.log('Agregando producto al carrito:', producto);
    agregarProducto(producto);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((producto) => (
            <div key={producto.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-700">
                    
                      {producto.nombre}
                    
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{producto.color}</p> {/* Asegúrate de que el JSON tenga el campo 'color' */}
                </div>
                <p className="text-sm font-medium text-gray-900">{producto.precio}</p>
                <button
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
