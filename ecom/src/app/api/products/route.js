

import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  const filePath = path.join(process.cwd(), 'public', 'Database', 'Stock.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'Database', 'Stock.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Lee el nuevo producto desde el cuerpo de la solicitud
    const nuevoProducto = await request.json();

    // Agrega el nuevo producto a la lista
    data.productos.push(nuevoProducto);

    // Escribe los productos actualizados en el archivo JSON
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Producto agregado exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al agregar el producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'Database', 'Stock.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Obtiene el ID del producto a eliminar desde la URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Filtra los productos para eliminar el que tiene el ID correspondiente
    const productosActualizados = data.productos.filter((producto) => producto.id !== id);

    // Actualiza el archivo JSON
    data.productos = productosActualizados;
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Producto eliminado exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al eliminar el producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
