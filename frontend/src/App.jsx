import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filterContent, setFilterContent] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const LoginOrRegister = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
      <div>
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Ya tengo cuenta' : 'Registrarme'}
        </button>
      </div>
    );
  };
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/')
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  const addTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      completed: false,
      date: new Date().toISOString().split('T')[0], // Cambié a solo fecha (sin hora)
    };

    fetch('http://127.0.0.1:8000/api/add-task', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Especificamos que enviamos JSON
      },
      body: JSON.stringify(newTask), // Convertimos el objeto a JSON
    });
    // setTasks([...tasks, newTask]);
    window.location.reload();
    setTaskTitle('');
    setTaskDescription('');
  };

  const deleteTask = (taskId) => {
    fetch('http://127.0.0.1:8000/api/delete-task', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Especificamos que enviamos JSON
      },
      body: JSON.stringify({ id: taskId }), // Convertimos el objeto a JSON
    });
    window.location.reload();
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
          Agregar tarea
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
