import React, { useState } from 'react';

export const TuComponente = () => {
   // Estado local para almacenar la lista de objetos
   const [listaObjetos, setListaObjetos] = useState([]);

   // Manejador de clics para agregar, sumar, restar y quitar
   const handleClick = (valor, operacion) => {
     // Verificar si el valor ya existe en la lista
     const objetoExistente = listaObjetos.find(objeto => objeto._id === valor);
 
     if (objetoExistente) {
       // Si el valor ya existe
       if (operacion === 'sumar') {
         // Sumar 1 al amount
         const nuevaLista = listaObjetos.map(objeto =>
           objeto._id === valor
             ? { ...objeto, amount: objeto.amount + 1 }
             : objeto
         );
         setListaObjetos(nuevaLista);
       } else if (operacion === 'restar') {
         // Restar 1 al amount si es mayor a 1, quitar el objeto si es igual a 1
         const nuevaLista = listaObjetos.map(objeto =>
           objeto._id === valor
             ? objeto.amount > 1
               ? { ...objeto, amount: objeto.amount - 1 }
               : null
             : objeto
         ).filter(Boolean); // Eliminar elementos nulos después de restar
         setListaObjetos(nuevaLista);
       }
     } else {
       // Si el valor no existe, agregar un nuevo objeto a la lista con amount 1
       setListaObjetos([...listaObjetos, { _id: valor, amount: 1 }]);
     }
   };
 
   return (
     <div>
       {/* Renderizar los botones */}
       <button onClick={() => handleClick('valor_1', 'sumar')}>Agregar y Sumar 1</button>
       <button onClick={() => handleClick('valor_2', 'sumar')}>Agregar y Sumar 2</button>
       <button onClick={() => handleClick('valor_3', 'sumar')}>Agregar y Sumar 3</button>
 
       <button onClick={() => handleClick('valor_1', 'restar')}>Restar y Quitar 1</button>
       <button onClick={() => handleClick('valor_2', 'restar')}>Restar y Quitar 2</button>
       <button onClick={() => handleClick('valor_3', 'restar')}>Restar y Quitar 3</button>
 
       {/* Mostrar la lista de objetos en el estado */}
       <div>
         <h2>Lista de Objetos:</h2>
         <ul>
           {listaObjetos.map((objeto, index) => (
             <li key={index}>{`{_id: "${objeto._id}", amount: ${objeto.amount}}`}</li>
           ))}
         </ul>
       </div>
     </div>
   );
};
