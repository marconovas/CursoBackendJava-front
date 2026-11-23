import { useEffect, useState } from "react";
import FormularioCategoria from "./FormularioCategoria";

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

    async function nuevaCategoria(categoria) {
        try{
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(categoria)
            })

            if(!response.ok) {
                throw new Error("Error http: " + response.status);
            }
            
            const nuevaCategoria = await response.json();

            setCategorias(prev => [
                ...prev,
                nuevaCategoria
            ]);
        } catch(error) {
            console.error("No se puedo crear la categoría:", error);
        }
        
    }

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

            <FormularioCategoria onAgregarCategoria={nuevaCategoria}/>
        </div>
    );
}

export default ListaCategorias;