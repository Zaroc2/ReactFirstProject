import { useEffect, useState } from 'react'
import './App.css'


//Componente para mostrar la lista de tareas
function ListaTareas({tareas, filtroCategoria, filtroEstado, funcion ,completeTask, deleteTask, abrirModal}) {//Las tareas, los filtros y una funcion a aplicar? Los componentes solo pueden recibir un parametro, so lo metemos en un objeto

  //Primero filtramos todas las tareas
  let tareasFiltradas = [];
  for (let i = 0; i < tareas.length; i++) {
    if ((tareas[i].categoria === filtroCategoria || filtroCategoria === 'todas') && (tareas[i].estado === filtroEstado || filtroEstado === 'todas')) {
      tareasFiltradas.push(tareas[i]);
    }
  }

  //Ahora, para cada una de las tareas filtradas, retornamos un componente React, lo cual lo hacemos con un mapeo a la lista de una funcion que devuelve dicho componente para cada tarea
  //El colSpan="3" es para que el mensaje de "No hay tareas :)" ocupe 3 columnas de la tabla
  if(tareasFiltradas.length === 0) {
    return <tr><td colSpan="6">No hay tareas :)</td></tr>
  }
  return(
    <>
      {tareasFiltradas.map((tarea) => {
        return <tr key={tarea.id}>
          <td>{tarea.texto}</td>
          <td>{tarea.categoria}</td>
          <td>{tarea.estado}</td>
          <td><button onClick={() => completeTask(tarea)}>✅</button></td>
          <td><button onClick={() => abrirModal(tarea)}>✏️</button></td>
          <td><button onClick={() => deleteTask(tarea)}>🗑️</button></td> 
          </tr>
      })}
    </>
  )

}

//Componente para agregar una nueva tarea
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
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
          </select></td>
          <td><label>Estado:</label><select value={nuevaTarea.estado} onChange={(e) => setNuevaTarea({...nuevaTarea, estado: e.target.value})}>
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
          </select></td>
        </tr>
      </tbody>
    </table>
    <button id="agregar-tarea" type="submit">Agregar Tarea</button>
    </form>

  )// Para cada input, hay un onChange, un estado que se guarda en el objeto e por cada evento (teclado por ejemplo) y que actualizar el valor de nuevaTarea

}


//Componente para editar la tarea
function ModalEditarTarea({tarea, actualizarYCerrarModal,cerrarModal}) {

  const [tareaEditada, setTareaEditada] = useState(tarea); // Estado para la tarea editada

  return (
    <div className="modalBackground">
      <div className="modalBody">
        <h2>Editar "{tarea.texto}"</h2>
        <div className="formRow">
          <label>Texto:</label>
        <input type="text" value={tareaEditada.texto} onChange={(e) => setTareaEditada({...tareaEditada, texto: e.target.value})} />
        </div>
        <div className="formRow">
          <label>Categoría:</label>
          <select value={tareaEditada.categoria} onChange={(e) => setTareaEditada({...tareaEditada, categoria: e.target.value})}>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
          </select>
        </div>
        <div className="formRow">
          <label>Estado:</label>
          <select value={tareaEditada.estado} onChange={(e) => setTareaEditada({...tareaEditada, estado: e.target.value})}>
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
        <button onClick={() => actualizarYCerrarModal(tareaEditada)}>Actualizar</button>
        <button onClick={() => cerrarModal()}>Cancelar</button>
      </div>
    </div>
  )

}

function cargarTareasLocalStorage(){

  const tareasGuardadas = localStorage.getItem('tareas');

  if(tareasGuardadas !== null) {
    return JSON.parse(tareasGuardadas);
  } else {
    return [ { id: 1, texto: 'Tarea de prueba 1', categoria: 'Personal', estado: 'Pendiente' },
             { id: 2, texto: 'Tarea de prueba 2', categoria: 'Trabajo', estado: 'Completada' } ];
  }

}



function App() {

  const [tareas, setTareas] = useState(cargarTareasLocalStorage()); // Estado para almacenar las tareas con 2 tareas de prueba
  const [nuevaTarea, setNuevaTarea] = useState({id: null, texto: '', categoria: 'Personal' , estado: 'Pendiente'}); // Estado para la nueva tarea
  const [filtroCategoria, setFiltroCategoria] = useState('todas'); // Estado para el filtro de categoría
  const [filtroEstado, setFiltroEstado] = useState('todas'); // Estado para el filtro de estado
  const [tareaAEditar, setTareaAEditar] = useState(null); // Estado para la tarea que se está editando
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar la apertura del modal

  useEffect(() => {localStorage.setItem('tareas', JSON.stringify(tareas))}, [tareas]); // Esto realiza un efecto secundario, cada vez que [tareas] cambia, realiza el localStorage.setItem()

  function completeTask(tarea){
    setTareas(tareas.map(t => t.id === tarea.id ? {...t, estado: t.estado === 'Pendiente' ? 'Completada' : 'Pendiente'} : t));
  }

  function deleteTask(tarea){
    setTareas(tareas.filter(t => t.id !== tarea.id));
  }

  function editTask(tarea){
    console.log("editing " + tarea.texto);
  }

  function abrirModal(tarea){
    setTareaAEditar(tarea);
    setModalAbierto(true);
  }

  function cerrarModal(){
    setTareaAEditar(null);
    setModalAbierto(false);
  }

  //Esto es una funcion callback, se la paso a ModalEditarTarea para que la llame al finalizar y actualice el valor de la TareaAEditar y luego cierre el modal
  function actualizarTarea(tareaActualizada){
    setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
    cerrarModal();
  }

  return (
    <>
    <div className="filtros">
      <label>Categoría:</label>
      <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="Personal">Personal</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Estudio">Estudio</option>
      </select>
    </div>
    <div className="filtros">
      <label>Estado:</label>
      <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
        <option value="todas">Todos</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Completada">Completada</option>
      </select>
    </div>
      <table id="tabla-tareas">
        <thead>
          <tr>
            {tareas.length !== 0 && (
              <>
                <th>Texto</th>
                <th>Categoría</th>
                <th>Estado</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
            <ListaTareas 
              tareas={tareas} 
              filtroCategoria={filtroCategoria} 
              filtroEstado={filtroEstado} 
              completeTask={completeTask} 
              deleteTask={deleteTask} 
              abrirModal={abrirModal}
            />
        </tbody>
      </table>

      <FormularioTarea nuevaTarea={nuevaTarea} setNuevaTarea={setNuevaTarea} agregarTarea={(e) => { //Esta es la funcion llamada cuando se hace submit a Agregar Tarea
        console.log("Agregando tarea: " + nuevaTarea.texto + " con categoria: " + nuevaTarea.categoria + " y estado: " + nuevaTarea.estado);
        e.preventDefault(); // Evitar que el formulario se envíe en el evento actual recargue la página
        if(nuevaTarea.texto.trim() === '') {
          alert('El texto de la tarea no puede estar vacío');
          return;
        }
        setTareas([...tareas, { id: Date.now(), texto: nuevaTarea.texto, categoria: nuevaTarea.categoria, estado: nuevaTarea.estado }]);
        setNuevaTarea({...nuevaTarea, texto: '' });
      } } />

      {modalAbierto && (
        <ModalEditarTarea tarea={tareaAEditar} actualizarYCerrarModal={actualizarTarea} cerrarModal={cerrarModal}/>
      )}
    </>

  )
}

export default App
