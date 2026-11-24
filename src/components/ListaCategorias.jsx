import { useEffect, useState } from "react";
import FormularioCategoria from "./FormularioCategoria";

const API_URL="http://localhost:8080/api/categorias";

function ListaCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [categoriaAEditar, setCategoriaAEditar] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [categoriaEliminando, setCategoriaEliminando] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error http: " + response.status);
                }
                
                return response.json()

            })
            .then(data => setCategorias(data))
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }, [])

    async function nuevaCategoria(categoria) {

        setMensaje("");
        setError(null);
        setIsSaving(true);

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

            setMensaje("Categoría creada exitosamente.");

        } catch(error) {

            setError(error.message);
            console.error("No se puedo crear la categoría:", error);
            throw error;
        
        } finally {
        
            setIsSaving(false);
        
        }
        
    }

    async function editarCategoria(categoria) {
        
        setMensaje("");
        setError(null);
        setIsSaving(true);

        try{
            const response = await fetch(`${API_URL}/${categoriaAEditar.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(categoria)
            });


            if(!response.ok) {
                throw new Error("Error http: " + response.status);
            }

            const categoriaModificada = await response.json();
            
            setCategorias(prev => prev.map(categoria => 
                categoria.id === categoriaModificada.id ?
                categoriaModificada 
                : categoria
            ));

            setMensaje("Categoría modificada exitosamente.");
            setCategoriaAEditar(null);
        } catch(error) {
            setError(error.message);
            console.error(error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    }

    async function eliminaCategoria(id) {
        const respuesta = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");

        
        if(respuesta) {
            setCategoriaEliminando(id);

            setMensaje("");
            setError(null);
        
            try{
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE"
                });
    
                if(!response.ok) {
                    throw new Error("Http error:" + response.status);
                }
    
                setCategorias(prev => 
                    prev.filter(categoria => 
                        categoria.id !== id
                    )
                );
            
                setMensaje("Categoría eliminada exitosamente.");

            } catch(error) {
                setError(error.message);
                console.error("No se pudo eliminar la categoria:", error);
            } finally {
                setCategoriaEliminando(null);
            }
        }
    }

    return(
        <div>
            <h2>Gestión de Categorías</h2>
            
            {mensaje && <h2>{mensaje}</h2>}


            {isLoading ? (
                <p>Cargando Categorías...</p>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <ul>
                    {categorias.map(categoria => 
                        <li key={categoria.id}>
                            <p>{categoria.nombre}</p>

                            <button
                                onClick={() => setCategoriaAEditar(categoria)}
                            >
                                Editar
                            </button>

                            <button
                                disabled={categoriaEliminando === categoria.id}
                                onClick={() => eliminaCategoria(categoria.id)}
                            >
                                {categoriaEliminando === categoria.id ?
                                    "Eliminando..." 
                                    : "Eliminar"
                                }
                            </button>
                        </li>
                    )}
                </ul>
            )}


            <FormularioCategoria 
                key={categoriaAEditar?.id ?? "nueva"}
                onAgregarCategoria={nuevaCategoria}
                onEditarCategoria={editarCategoria}
                categoriaAEditar={categoriaAEditar}    
                isSaving={isSaving}
            />
        </div>
    );
}

export default ListaCategorias;