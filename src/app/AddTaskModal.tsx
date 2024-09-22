// app/tasks/AddTaskModal.tsx
import { useState } from 'react';
// import styles from './styles/components/AddTaskModal.module.scss'

const AddTaskModal = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <div className="modal">
      <h2>Nova Tarefa</h2>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Digite o título da tarefa"
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
};

export default AddTaskModal;
