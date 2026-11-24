import './App.css'
import ListaArticulos from './components/ListaArticulos'
import ListaCategorias from './components/ListaCategorias.jsx'
import Seccion from './components/Seccion'

const articulos = [
    {id: 1, nombre: "articulo 1", precio: 100},
    {id: 2, nombre: "articulo 2", precio: 200},
    {id: 3, nombre: "articulo 3", precio: 300}
]

function App() {

  return (
    <div>
      <h1>TalentoTech</h1>
      <p>Gestión de artículos y categorías</p>

      <Seccion titulo="Artículos" descripcion="Gestioná los articulos disponibles."/>
      <Seccion titulo="Categorías" descripcion="Administrá las categorías de artículos."/>

      <ListaArticulos articulos={articulos} />

      <ListaCategorias />

    </div> 
  )
}

export default App
