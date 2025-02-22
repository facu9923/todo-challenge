// import { useEffect, useState } from 'react';
// function App() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/')
//       .then((response) => response.json())
//       .then((data) => setData(data.tasks));
//   }, []);
//   console.log(data);
//   return (
//     <>
//       <h1>API Data</h1>
//       {data.length == 0 ? (
//         <p>No hay datos disponibles</p>
//       ) : (
//         <ul>
//           {data.map((item) => (
//             <li key={item.id}>{item.title}</li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

// export default App;

///////////////////////////////////////////////

import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filterContent, setFilterContent] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const addTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      date: new Date().toLocaleDateString(), // Cambié a solo fecha (sin hora)
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrar tareas según el contenido y la fecha
  const filteredTasks = tasks.filter((task) => {
    const matchesContent =
      task.title.toLowerCase().includes(filterContent.toLowerCase()) ||
      task.description.toLowerCase().includes(filterContent.toLowerCase());
    const matchesDate = filterDate ? task.date === filterDate : true; // Compara solo si hay fecha
    return matchesContent && matchesDate;
  });

  return (
    <div className="container">
      <div className="task-app">
        <h1>📝 Lista de Tareas</h1>

        <div className="task-input">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Título..."
          />
        </div>

        <div className="task-input">
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Descripción..."
          ></textarea>
        </div>

        <button className="add-btn" onClick={addTask}>
          ➕ Agregar Tarea
        </button>

        {/* Filtros */}
        <div className="filters">
          {/* Filtro por contenido */}
          <div className="filter-input">
            <label htmlFor="content-filter">Filtrar por contenido:</label>
            <input
              type="text"
              id="content-filter"
              placeholder="Buscar tareas..."
              value={filterContent}
              onChange={(e) => setFilterContent(e.target.value)}
            />
          </div>

          {/* Filtro por fecha */}
          <div className="filter-input">
            <label htmlFor="date-filter">Filtrar por fecha:</label>
            <input
              type="date"
              id="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>

        {/* Renderizado de las tareas */}
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      </div>
    </div>
  );
};

export default App;
