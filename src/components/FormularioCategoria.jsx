import { useState } from "react";

function FormularioCategoria ({ onAgregarCategoria, onEditarCategoria, categoriaAEditar, isSaving}) {
    const [nombre, setNombre] = useState(categoriaAEditar?.nombre ?? "");
    const [errorValidacion, setErrorValidacion] = useState("");

    async function manejarCategoria(e) {
        e.preventDefault();
        setErrorValidacion("");

        if(nombre.trim() === "") {
            setErrorValidacion("El nombre es obligatorio.");
            return;
        }

        const categoria = {
            nombre: nombre.trim()
        }

        try{
            if(categoriaAEditar) {
                await onEditarCategoria(categoria);
            } else {
                await onAgregarCategoria(categoria);
            }

            setNombre("");
        } catch(error) {
            setErrorValidacion(error.message);
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
                required
            />

            {errorValidacion && <p>{errorValidacion}</p>}

            <button
                type="submit"
                disabled={isSaving}
            >
                {isSaving ? "Guardando..." : "Enviar"}
            </button>
        </form>
    )
}

export default FormularioCategoria;