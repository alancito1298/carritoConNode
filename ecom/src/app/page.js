
import Nav from './nav'
import Inicio from '@/app/inicio'
import Productos from './productos'
import ProductosTabla from './admin'
import Carrito from '@/carrito'
import PanelAgregarProducto from '@/panelAgregarProducto'
export default function Home() {
  return (
    <>
 
     <Nav></Nav>
     <Inicio></Inicio>
     <Productos></Productos>
     <ProductosTabla/>
    <Carrito/>
   
     </>
     
  )
}
