import { useState } from "react";

function FormularioArticulo({ onAgregarArticulo }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");

    function manejarEnvio(e) {
        e.preventDefault();

        const articulo = {
            nombre,
            precio : Number(precio)
        }

        onAgregarArticulo(articulo);

        setNombre("");
        setPrecio("");
    }

    return(
        <form
            onSubmit={manejarEnvio}
        >
            <label>Nombre</label>
            <input 
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)} 
                required
            />

            <label>Precio</label>
            <input 
                type="number"
                min={0}
                value={precio}
                onChange={e => setPrecio(e.target.value)} 
                required
            />

            <button type="submit">Enviar</button>
        </form>
    )
}

export default FormularioArticulo;