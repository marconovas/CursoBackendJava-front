import { useState } from "react";

function FormularioCategoria ({ onAgregarCategoria, onEditarCategoria, categoriaAEditar }) {
    const [nombre, setNombre] = useState(categoriaAEditar?.nombre ?? "");

    async function manejarCategoria(e) {
        e.preventDefault();

        const categoria = {
            nombre
        }

        try{
            if(categoriaAEditar) {
                await onEditarCategoria(categoria);
            } else {
                await onAgregarCategoria(categoria);
            }

            setNombre("");
        } catch(error) {
            console.error(error);
        }

    }

    return(
        <form
            onSubmit={manejarCategoria}
        >
            <input 
                onChange={e => setNombre(e.target.value)}
                value={nombre}
                type="text" 
            />

            <button
                type="submit"
            >
                Enviar
            </button>
        </form>
    )
}

export default FormularioCategoria;