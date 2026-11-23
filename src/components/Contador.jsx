import { useState } from "react";

function Contador() {
    const [contador, setContador] = useState(0);

    return(
        <div>
            <button
                type="button"
                onClick={() => setContador(prev => prev + 1)}
            >
                Incrementar
            </button>
            
            <button
                type="button"
                onClick={() => setContador(prev => 
                    prev === 0 ? 
                        prev : 
                        prev - 1                
                )}
            >
                Decrementar
            </button>
            
            <p>{contador}</p>
        </div>
    )

}

export default Contador;