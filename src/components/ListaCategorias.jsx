import { useEffect, useState } from "react";

const API_URL="http://localhost:8080/api/categorias";

function ListaCategorias() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error http: " + response.status);
                }
                
                return response.json()

            })
            .then(data => setCategorias(data))
            .catch(error => console.error(error))
    }, [])

    return(
        <div>
            <h2>Gestión de Categorías</h2>

            <ul>
                {categorias.map(categoria => 
                    <li key={categoria.id}>
                        <p>{categoria.nombre}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ListaCategorias;