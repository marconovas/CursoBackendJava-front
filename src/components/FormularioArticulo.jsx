import { useEffect, useState } from "react";

const API_CATEGORIAS = "http://localhost:8080/api/categorias";

function FormularioArticulo({ onAgregarArticulo, onModificarArticulo, articuloAEditar }) {
    const [nombre, setNombre] = useState(articuloAEditar?.nombre ?? "");
    const [precio, setPrecio] = useState(articuloAEditar?.precio ?? "");
    const [stock, setStock] = useState(articuloAEditar?.stock ?? "");
    const [categoriaId, setCategoriaId] = useState(
        articuloAEditar?.categoria.id ?? ""
    );
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch(API_CATEGORIAS)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error http: " + response.status);
                }
                
                return response.json()
            })
            .then(data => setCategorias(data))
            .catch(error => console.error("Error al cargar categorias:", error)
            )
    }, []);


    async function manejarEnvio(e) {
        e.preventDefault();

        const articulo = {
            nombre,
            precio : Number(precio),
            stock: Number(stock),
            categoria: {
                id: Number(categoriaId)
            }
        }

        try{
            if(articuloAEditar) {
                await onModificarArticulo(articuloAEditar.id, articulo);   
            } else {
                await onAgregarArticulo(articulo);
            }

            setNombre("");
            setPrecio("");
            setStock("");
            setCategoriaId("");

        } catch(error) {
            console.error("Error al guardar el artículo:", error);
        }
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
            
            <label>Stock</label>
            <input 
                type="number"
                min={0}
                value={stock}
                onChange={e => setStock(e.target.value)} 
                required
            />
            
            <label>Categoria</label>
            <select
                value={categoriaId}
                onChange={e => setCategoriaId(e.target.value)}
                required
            >
                <option value="">Seleccionar categoría</option>

                {categorias.map(categoria => (
                    <option
                        key={categoria.id}
                        value={categoria.id}
                    >
                        {categoria.nombre}
                    </option>
                ))}
            
            </select>
            
            <button type="submit">Enviar</button>
        </form>
    )
}

export default FormularioArticulo;