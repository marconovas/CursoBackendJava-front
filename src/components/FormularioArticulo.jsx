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
    const [errorValidacion, setErrorValidacion] = useState("");

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
        setErrorValidacion("");

        if(nombre.trim() === "") {
            setErrorValidacion("El nombre no puede estar vacío.");
            return;
        }
        
        if(Number.isNaN(Number(precio)) || Number(precio) <= 0) {
            setErrorValidacion("El precio debe ser mayor que cero.");
            return;
        } 
        
        if(Number.isNaN(Number(stock)) || Number(stock) <= 0) {
            setErrorValidacion("El stock debe ser mayor que cero.");
            return;
        } 

        if(categoriaId === "") {
            setErrorValidacion("Debés seleccionar una categoría.");
            return;
        }

        const articulo = {
            nombre: nombre.trim(),
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
            setErrorValidacion(error.message);
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

            {errorValidacion && <p>{errorValidacion}</p>}
            
            <button type="submit">Enviar</button>
        </form>
    )
}

export default FormularioArticulo;