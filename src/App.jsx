import { useState } from 'react'
import './App.css'


function ListaTareas({tareas, filtroCategoria, filtroEstado, funcion ,completeTask, deleteTask, editTask}) {//Las tareas, los filtros y una funcion a aplicar? Los componentes solo pueden recibir un parametro, so lo metemos en un objeto

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
        return <tr key={tarea.id}>
          <td>{tarea.texto}</td>
          <td>{tarea.categoria}</td>
          <td>{tarea.estado}</td>
          <td><button onClick={() => completeTask(tarea)}>✅</button></td>
          <td><button onClick={() => editTask(tarea)}>✏️</button></td>
          <td><button onClick={() => deleteTask(tarea)}>🗑️</button></td> 
          </tr>
      })}
    </>
  )

}


function FormularioTarea({nuevaTarea, setNuevaTarea, agregarTarea}) {

  return(//Un formulario que cuando se hace submit llama a la funcion agregarTarea

    <form onSubmit={agregarTarea}>

    <table id="formulario-tarea">
      <thead>
          <tr>
            <th>Texto</th>
            <th>Categoría</th>
            <th>Estado</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td><label>Texto:</label><input type="text" value={nuevaTarea.texto} onChange={(e) => setNuevaTarea({...nuevaTarea, texto: e.target.value})} /></td> 
          <td><label>Categoría:</label><select value={nuevaTarea.categoria} onChange={(e) => setNuevaTarea({...nuevaTarea, categoria: e.target.value})}>
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="estudio">Estudio</option>
          </select></td>
          <td><label>Estado:</label><select value={nuevaTarea.estado} onChange={(e) => setNuevaTarea({...nuevaTarea, estado: e.target.value})}>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select></td>
        </tr>
      </tbody>
    </table>
    <button id="agregar-tarea" type="submit">Agregar Tarea</button>
    </form>

  )// Para cada input, hay un onChange, un estado que se guarda en el objeto e por cada evento (teclado por ejemplo) y que actualizar el valor de nuevaTarea

}


function App() {

  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Tarea de prueba 1', categoria: 'personal', estado: 'pendiente' },
    { id: 2, texto: 'Tarea de prueba 2', categoria: 'trabajo', estado: 'completada' }
  ]); // Estado para almacenar las tareas con 2 tareas de prueba
  const [nuevaTarea, setNuevaTarea] = useState({ texto: '', categoria: 'personal' }); // Estado para la nueva tarea
  const [filtroCategoria, setFiltroCategoria] = useState('todas'); // Estado para el filtro de categoría
  const [filtroEstado, setFiltroEstado] = useState('todas'); // Estado para el filtro de estado

  function completeTask(tarea){
    setTareas(tareas.map(t => t.id === tarea.id ? {...t, estado: t.estado === 'pendiente' ? 'completada' : 'pendiente'} : t));
  }

  function deleteTask(tarea){
    setTareas(tareas.filter(t => t.id !== tarea.id));
  }

  function editTask(tarea){
    console.log("editing " + tarea.texto);
  }

  return (
    <>
      <table id="tabla-tareas">
        <thead>
          <tr>
            <th>Texto</th>
            <th>Categoría</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <ListaTareas tareas={tareas} filtroCategoria={filtroCategoria} filtroEstado={filtroEstado} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} />
        </tbody>
      </table>

      <FormularioTarea nuevaTarea={nuevaTarea} setNuevaTarea={setNuevaTarea} agregarTarea={(e) => { //Esta es la funcion llamada cuando se hace submit a Agregar Tarea
        e.preventDefault(); // Evitar que el formulario se envíe en el evento actual recargue la página
        if(nuevaTarea.texto.trim() === '') {
          alert('El texto de la tarea no puede estar vacío');
          return;
        }
        setTareas([...tareas, { id: Date.now(), texto: nuevaTarea.texto, categoria: nuevaTarea.categoria, estado: 'pendiente' }]);
        setNuevaTarea({ texto: '', categoria: 'personal' });
      } } />
    </>

  )
}

export default App
