import { useState } from "react";
import FormularioArticulo from "./FormularioArticulo";

const arrayArticulos = [
    { id: 1, nombre: "Teclado", precio: 100 },
    { id: 2, nombre: "Mouse", precio: 200 }
];

function ListaArticulos() {

    const [articulos, setArticulos] = useState(arrayArticulos);

    function agregarArticulo(articulo) {
        const nuevoArticulo = {
            ...articulo,
            id: Date.now()
        }

        setArticulos(prev => [
            ...prev, 
            nuevoArticulo
        ]);
    }

    return(
        <>
            <ul>
                {articulos.map(articulo => (
                    <li key={articulo.id}>
                        <h2>{articulo.nombre}</h2>
                        <p>{articulo.precio}</p>
                        <button onClick={() => {
                            setArticulos(prev => prev.filter(item => item.id !== articulo.id))
                        }}>
                            Eliminar
                        </button>
                        <button
                            onClick={() => setArticulos(prev => 
                                prev.map(item => 
                                    item.id === articulo.id ?
                                    {
                                        ...item,
                                        precio: item.precio * 2
                                    } :
                                    item
                                )
                            )}
                        >
                            Duplicar precio
                        </button>
                    </li>
                ))}
            </ul>

            <FormularioArticulo onAgregarArticulo={agregarArticulo}/>

        </>
       
    );

}

export default ListaArticulos;