// app/tasks/page.tsx
"use client";

import '../app/styles/components/globals.css'
import TaskList from './TaskList';

// import styles from '../styles/main.module.scss'


const TasksPage = () => {
  return (
    <div>
      <TaskList/>
    </div>
  );
};

export default TasksPage;

