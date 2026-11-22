import { useEffect, useState } from "react";
import FormularioArticulo from "./FormularioArticulo";

const API_URL = "http://localhost:8080/api/articulos";

function ListaArticulos() {

    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error http: " + response.status);
                }

                return response.json();
            })
            .then(data => setArticulos(data))
            .catch(error => setError(error))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    async function agregarArticulo(articulo) {
        try{
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(articulo)
            });

            if(!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }

            const nuevoArticulo = await response.json();

            setArticulos(prev => [
                ...prev,
                nuevoArticulo
            ]);

        } catch(error) {
            setError(error.message);
            console.error(error);
        }
    }

    return(
        <>
            {isLoading ? (
                <span>Cargando articulos...</span>
            ) : error !== null ? (
                    <p>{error}</p>
                ) : (
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
            )}

            <FormularioArticulo onAgregarArticulo={agregarArticulo}/>

        </>
       
    );

}

export default ListaArticulos;