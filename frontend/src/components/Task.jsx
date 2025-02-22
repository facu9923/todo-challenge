import React from 'react';

const Task = ({ task, deleteTask, toggleTaskCompletion }) => {
  return (
    <div className="task">
      <div className="task-content">
        <h3
          className={task.completed ? 'completed' : ''}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.title}
        </h3>
        <p className="description">{task.description || 'Sin descripción'}</p>
        <p className="date">📅 {task.date}</p>
      </div>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        ❌
      </button>
    </div>
  );
};

export default Task;
