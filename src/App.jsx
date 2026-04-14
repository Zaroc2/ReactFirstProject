import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function ListaTareas({tareas, filtroCategoria, filtroEstado, funcion}) {//Las tareas, los filtros y una funcion a aplicar? Los componentes solo pueden recibir un parametro, so lo metemos en un objeto

  //Primero filtramos todas las tareas
  let tareasFiltradas = [];
  for (let i = 0; i < tareas.length; i++) {
    if ((tareas[i].categoria === filtroCategoria || filtroCategoria === 'todas') && (tareas[i].estado === filtroEstado || filtroEstado === 'todas')) {
      tareasFiltradas.push(tareas[i]);
    }
  }

  //Ahora, para cada una de las tareas filtradas, retornamos un componente React, lo cual lo hacemos con un mapeo a la lista de una funcion que devuelve dicho componente para cada tarea
  
  return(

    <>
    
      {tareasFiltradas.map((tarea) => {
        return <tr key={tarea.id}><td>{tarea.id}</td><td>{tarea.texto}</td><td>{tarea.categoria}</td><td>{tarea.estado}</td><td><button onClick={() => (console.log(tarea.texto))}>Editar</button></td></tr>
      })}

    </>


  )

}


function App() {
  const [count, setCount] = useState(0)

  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Tarea de prueba 1', categoria: 'personal', estado: 'pendiente' },
    { id: 2, texto: 'Tarea de prueba 2', categoria: 'trabajo', estado: 'completada' }
  ]); // Estado para almacenar las tareas con 2 tareas de prueba
  const [nuevaTarea, setNuevaTarea] = useState({ texto: '', categoria: 'personal' }); // Estado para la nueva tarea
  const [filtroCategoria, setFiltroCategoria] = useState('todas'); // Estado para el filtro de categoría
  const [filtroEstado, setFiltroEstado] = useState('todas'); // Estado para el filtro de estado

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Texto</th>
            <th>Categoría</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <ListaTareas tareas={tareas} filtroCategoria={filtroCategoria} filtroEstado={filtroEstado} /*funcion undefined for now*/ />
        </tbody>
      </table>
      <></>
    </>
  )
}

export default App
