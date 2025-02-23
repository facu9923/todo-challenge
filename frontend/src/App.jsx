import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [taskTitle, setTaskTitle] = useState(''); // Estado para el título de la tarea
  const [taskDescription, setTaskDescription] = useState(''); // Estado para la descripción de la tarea
  const [filterContent, setFilterContent] = useState(''); // Estado para el filtro de contenido
  const [filterDate, setFilterDate] = useState(''); // Estado para el filtro de fecha
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  // Componente para mostrar Login o Register
  const LoginOrRegister = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
      <div>
        {showRegister ? (
          <RegisterForm setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <LoginForm setIsAuthenticated={setIsAuthenticated} />
        )}
        <div
          className="login-button-container"
          style={{
            width: '300px',
            marginLeft: '150px',
          }}
        >
          <button type="submit" onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? 'Volver' : 'Registrarme'}
          </button>
        </div>
      </div>
    );
  };

  // Cargar las tareas desde el servidor al iniciar sesión
  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://127.0.0.1:8000/api/')
        .then((response) => response.json())
        .then((data) => setTasks(data.tasks));
    }
  }, [isAuthenticated]);

  // Función para agregar una tarea
  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      completed: false,
      date: new Date().toISOString().split('T')[0], // Solo la fecha
    };

    fetch('http://127.0.0.1:8000/api/add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del backend:', data); // Debug
        if (!data.id) {
          // Si la respuesta no contiene la tarea, recargamos desde el servidor
          fetch('http://127.0.0.1:8000/api/')
            .then((response) => response.json())
            .then((newData) => setTasks(newData.tasks));
        } else {
          setTasks((prevTasks) => [...prevTasks, data]);
        }
        setTaskTitle('');
        setTaskDescription('');
      })
      .catch((error) => console.error('Error al agregar la tarea:', error));
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    fetch('http://127.0.0.1:8000/api/delete-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar la tarea');

        // Verifica si la respuesta tiene contenido antes de parsear JSON
        return response.status === 204 ? null : response.json();
      })
      .then(() => {
        // Filtramos la tarea eliminada sin necesidad de recargar la página
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error('Error al eliminar la tarea:', error));
  };

  // Función para marcar una tarea como completada o pendiente
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
      task.title?.toLowerCase().includes(filterContent.toLowerCase()) ||
      task.description?.toLowerCase().includes(filterContent.toLowerCase());

    const matchesDate = filterDate ? task.date?.startsWith(filterDate) : true;

    return matchesContent && matchesDate;
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div className="container">
      <div className="task-app">
        <Routes>
          <Route path="/login" element={<LoginOrRegister />} />
          <Route path="/register" element={<LoginOrRegister />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <h1>📝 Lista de Tareas</h1>
                  <button className="logout-btn" onClick={handleLogout}>
                    Cerrar sesión
                  </button>

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
                      <label htmlFor="content-filter">
                        Filtrar por contenido:
                      </label>
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
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
