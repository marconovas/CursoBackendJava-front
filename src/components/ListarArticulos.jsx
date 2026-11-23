function ListarArticulos ({articulos}) {
    return(
        <ul>
            {
                articulos.map(articulo => (
                    <li key={articulo.id}>
                        <h2>{articulo.nombre}</h2>
                        <p>{articulo.precio}</p>
                    </li>
                ))
            }
        </ul>
    )
}

export default ListarArticulos;