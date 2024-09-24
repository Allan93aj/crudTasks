"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/styles/components/TaskList.module.scss';
import Logo from './assets/img/minhalogo.png'
import Checkboxvazia from './assets/img/checkboxvazio.png'
import Checkboxpreenchido from './assets/img/checkboxpreenchido.png'
import Trash from './assets/img/trash.png'
import Plus from './assets/img/plus.svg'
import EditIcon from './assets/img/edit.svg'; // Imagem para o ícone de editar

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<number | null>(null); // ID da tarefa em edição
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>(''); // Novo título da tarefa editada

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const correctTaskTitle = (title: string): string => {
    let correctedTitle = title.trim();
    if (correctedTitle.length > 0) {
      correctedTitle = correctedTitle[0].toUpperCase() + correctedTitle.slice(1);
    }

    const punctuation = ['.', '!', '?'];
    if (correctedTitle && !punctuation.includes(correctedTitle[correctedTitle.length - 1])) {
      correctedTitle += '.';
    }

    return correctedTitle;
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;

    const correctedTitle = correctTaskTitle(newTaskTitle);

    const newTask: Task = {
      id: tasks.length + 1,
      title: correctedTitle,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTaskTitle('');
    setIsTaskModalOpen(false);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const openConfirmDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setIsConfirmDeleteOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setTaskToDelete(null);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() !== '') {
      setIsModalOpen(false);
    }
  };

  const editTask = (taskId: number, taskTitle: string) => {
    setTaskToEdit(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const saveEditedTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: correctTaskTitle(editedTaskTitle) } : task
    );
    setTasks(updatedTasks);
    setTaskToEdit(null);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
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

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  
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
          <div className={styles.modalnewtask}>
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
          <div className={styles.modaldeletetask}>
            <div className={styles.modalContent}>
              <h2>Deletar tarefa</h2>
              <p>Tem certeza que você deseja deletar essa tarefa?</p>
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

                        {/* Se o ID da tarefa for o que está em edição, mostra um input */}
                        {taskToEdit === task.id ? (
                          <input
                            type="text"
                            value={editedTaskTitle}
                            onChange={(e) => setEditedTaskTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEditedTask(task.id)}
                            className={styles.editInput}
                          />
                        ) : (
                          <span>{task.title}</span>
                        )}

                        <div className={styles.wrapperButtons}>
                          {/* Botão de editar */}
                          {taskToEdit === task.id ? (
                            <>
                              <button onClick={() => saveEditedTask(task.id)} className={styles.saveButton}>
                                Salvar
                              </button>
                              <button onClick={cancelEdit} className={styles.cancelEditButton}>
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button onClick={() => editTask(task.id, task.title)} className={styles.editButton}>
                              <Image src={EditIcon} alt="Editar" />
                            </button>
                          )}

                          {/* Botão de deletar */}
                          <button onClick={() => openConfirmDelete(task.id)} className={styles.deleteButton}>
                            <Image src={Trash} alt="Deletar" />
                          </button>
                        </div>
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
                          <div className={styles.wrapperdeleteButton}>
                          <button onClick={() => openConfirmDelete(task.id)} className={styles.deleteButton}>
                            <Image src={Trash} alt="Deletar" />
                          </button>
                          </div>
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