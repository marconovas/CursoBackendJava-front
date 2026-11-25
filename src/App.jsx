import './App.css'
import ListaArticulos from './components/ListaArticulos'
import ListaCategorias from './components/ListaCategorias.jsx'
import Seccion from './components/Seccion'


function App() {

  return (
    <div>
      <h1>TalentoTech</h1>
      <p>Gestión de artículos y categorías</p>

      <Seccion titulo="Artículos" descripcion="Gestioná los articulos disponibles."/>
      <Seccion titulo="Categorías" descripcion="Administrá las categorías de artículos."/>

      <ListaArticulos />

      <ListaCategorias />

    </div> 
  )
}

export default App
