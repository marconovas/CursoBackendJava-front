import { useEffect, useState } from "react";
import FormularioArticulo from "./FormularioArticulo";

const API_URL = "http://localhost:8080/api/articulos";

function ListaArticulos() {

    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [articuloAEditar, setArticuloAEditar] = useState(null);

    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error http: " + response.status);
                }

                return response.json();
            })
            .then(data => setArticulos(data))
            .catch(error => setError(error.message))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    async function agregarArticulo(articulo) {
        setError(null);

        try{
            setMensaje("");

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

            setMensaje("Artículo creado correctamente.");

        } catch(error) {
            setError(error.message);
            console.error(error);
            throw error;
        }
    }

    async function editarArticulo(id, articulo) {
        setError(null);

        try{
            setMensaje("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(articulo)
            })

            if(!response.ok) {
                throw new Error("Http Error: " + response.status);
            }

            const articuloModificado = await response.json();

            setArticulos(prev => 
                prev.map(item => 
                    item.id === id ? 
                        articuloModificado
                    : item
                )
            );

            setArticuloAEditar(null);

            setMensaje("Articulo modificado exitosamente.");

        } catch(error) {
            setError(error.message);
            console.error(error);
            throw error;
        }
    }

    async function eliminarArticulo(id) {
        setError(null);

        try{
            setMensaje("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            })

            if(!response.ok) {
                throw new Error("Error http: " + response.status);
            }

            setArticulos(prev => 
                prev.filter(item => item.id !== id)
            );

            setMensaje("Artículo eliminado exitosamente.");

        } catch(error) {
            setError(error.message);
            console.error(error);
            throw error;
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
                                    if(window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
                                        eliminarArticulo(articulo.id);
                                    }
                                }}>
                                    Eliminar
                                </button>
                                
                                <button onClick={() => {
                                    setArticuloAEditar(articulo);
                                }}>
                                    Editar Artículo
                                </button>
                            </li>
                        ))}
                    </ul>
            )}

            <FormularioArticulo 
                key={articuloAEditar?.id ?? "nuevo"} 
                onAgregarArticulo={agregarArticulo}
                onModificarArticulo={editarArticulo}
                articuloAEditar={articuloAEditar} 
            />

            {mensaje && <p>{mensaje}</p>}
            {error && <p>{error.message}</p>}

        </>
       
    );

}

export default ListaArticulos;