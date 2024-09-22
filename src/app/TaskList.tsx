"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/styles/components/TaskList.module.scss';
import Logo from './assets/img/minhalogo.png'
import Checkboxvazia from './assets/img/checkboxvazio.png'
import Checkboxpreenchido from './assets/img/checkboxpreenchido.png'
import Trash from './assets/img/trash.png'
import Plus from './assets/img/plus.svg'


interface Task {
    id: number;
    title: string;
    completed: boolean; // Adiciona um campo para marcar a tarefa como concluída
  }
  
  const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>(""); // Título da nova tarefa
    const [userName, setUserName] = useState<string>(""); // Nome do usuário
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal para o nome do usuário
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false); // Modal para nova tarefa
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false); // Modal de confirmação para deletar
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // Armazena o ID da tarefa que será deletada
  
    useEffect(() => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);
  
    const correctTaskTitle = (title: string): string => {
      let correctedTitle = title.trim();
      if (correctedTitle.length > 0) {
        correctedTitle = correctedTitle[0].toUpperCase() + correctedTitle.slice(1);
      }
  
      const punctuation = [".", "!", "?"];
      if (correctedTitle && !punctuation.includes(correctedTitle[correctedTitle.length - 1])) {
        correctedTitle += ".";
      }
  
      return correctedTitle;
    };
  
    const addTask = () => {
      if (newTaskTitle.trim() === "") return;
  
      const correctedTitle = correctTaskTitle(newTaskTitle);
  
      const newTask: Task = {
        id: tasks.length + 1,
        title: correctedTitle,
        completed: false, // Tarefa inicialmente não concluída
      };
  
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTaskTitle("");
      setIsTaskModalOpen(false); // Fecha o modal de nova tarefa
  
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
  
    // Abre o modal de confirmação para deletar a tarefa
    const openConfirmDelete = (taskId: number) => {
      setTaskToDelete(taskId);
      setIsConfirmDeleteOpen(true); // Abre o modal de confirmação
    };
  
    // Função para confirmar a exclusão da tarefa
    const confirmDeleteTask = () => {
      if (taskToDelete !== null) {
        const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
        setTasks(updatedTasks);
  
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setIsConfirmDeleteOpen(false); // Fecha o modal após deletar
      }
    };
  
    // Função para cancelar a exclusão
    const cancelDelete = () => {
      setIsConfirmDeleteOpen(false); // Fecha o modal sem deletar
      setTaskToDelete(null); // Limpa a tarefa selecionada
    };
  
    const toggleTaskCompletion = (taskId: number) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
  
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addTask();
      }
    };
  
    const handleNameSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (userName.trim() !== "") {
        setIsModalOpen(false); // Fecha o modal quando o nome é inserido
      }
    };
  
    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentDate(formattedDate);
    }, []);
  
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);
  
    return (
      <div className={styles.container}>
        {isModalOpen && (
          <div className={styles.modalnome}>
            <div className={styles.modalContent}>
              <h2>Digite seu nome para começar</h2>
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.buttonPrimary}>
                  Começar
                </button>
              </form>
            </div>
          </div>
        )}
  
        {isTaskModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Nova tarefa</h2>
              <p>Título</p>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite"
                required
                className={styles.input}
              />
              <div className={styles.modalButtons}>
                <button onClick={() => setIsTaskModalOpen(false)} className={styles.cancelar}>
                  Cancelar
                </button>
                <button onClick={addTask} className={styles.adicionar}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Modal de confirmação para deletar a tarefa */}
        {isConfirmDeleteOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Tem certeza que deseja deletar essa tarefa?</h2>
              <div className={styles.modalButtons}>
                <button onClick={cancelDelete} className={styles.cancelar}>
                  Cancelar
                </button>
                <button onClick={confirmDeleteTask} className={styles.deletar}>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        )}
  
        {!isModalOpen && (
          <div className={styles.main}>
            {/* Conteúdo principal */}
            <div className={styles.header}>
              <div className={styles.logo}>
                <Image src={Logo} alt="Minha logo" />
              </div>
              {userName && (
                <div className={styles.wellcome}>
                  <h2>Bem-vindo de volta, <span>{userName}</span></h2>
                </div>
              )}
              <div className={styles.date}>
                <p>{currentDate}</p>
              </div>
            </div>
  
            <div className={styles.addnewtask}>
              <div className={styles.wrappertasks}>
                {pendingTasks.length > 0 && (
                  <div className={styles.addtarefa}>
                    <div>
                      <h3>Suas tarefas de hoje</h3>
                    </div>
                    <ul className={styles.taskList}>
                      {pendingTasks.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                          <button
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`${styles.button} ${styles.checkButton}`}>
                            <Image src={Checkboxvazia} alt="Marcar como concluída" />
                          </button>
                          {task.title}
                          <button onClick={() => openConfirmDelete(task.id)} className={styles.deleteButton}>
                            <Image src={Trash} alt="Deletar" className={styles.trashIcon} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
  
                {completedTasks.length > 0 && (
                  <div className={styles.completedTasks}>
                    <h3>Tarefas Finalizadas</h3>
                    <ul className={styles.taskList}>
                      {completedTasks.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                          <button
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`${styles.button} ${styles.checkButton}`}>
                            <Image src={Checkboxpreenchido} alt="Desmarcar como concluída" />
                          </button>
                          {task.title}
                          <button onClick={() => openConfirmDelete(task.id)} className={styles.deleteButton}>
                            <Image src={Trash} alt="Deletar" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
  
            <div className={styles.addButton}>
              <button onClick={() => setIsTaskModalOpen(true)} className={styles.buttonAddTask}>
                <Image src={Plus} alt="Adicionar nova tarefa" />
                Adicionar nova tarefa
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default TaskList;