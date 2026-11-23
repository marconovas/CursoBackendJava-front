import { useState } from "react";

function FormularioCategoria ({ onAgregarCategoria }) {
    const [nombre, setNombre] = useState("");

    function manejarCategoria(e) {
        e.preventDefault();

        const categoria = {
            nombre
        }

        onAgregarCategoria(categoria);
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