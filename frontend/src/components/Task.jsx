import React from 'react';
const Task = ({ task, deleteTask, toggleTaskCompletion }) => {
  const handleToggle = () => {
    fetch('http://127.0.0.1:8000/api/update-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        description: task.description,
        date: task.date,
        completed: !task.completed,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        toggleTaskCompletion(task.id);
      })
      .catch((error) => console.error('Error al actualizar la tarea:', error));
  };

  return (
    <div className={`task ${task.completed ? 'completed-task' : ''}`}>
      <div className="task-content">
        <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
        <p className="description">{task.description || 'Sin descripción'}</p>
        <p className="date">📅 {task.date}</p>
      </div>

      <div className="task-actions">
        <button className="toggle-btn" onClick={handleToggle}>
          {task.completed ? 'Desmarcar' : 'Completar'}
        </button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default Task;
