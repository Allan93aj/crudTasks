// app/tasks/DeleteTaskModal.tsx
const DeleteTaskModal = ({ onDelete, onCancel }: { onDelete: () => void, onCancel: () => void }) => {
    return (
      <div className="modal">
        <h2>Deletar Tarefa</h2>
        <p>Tem certeza que deseja deletar essa tarefa?</p>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onDelete}>Deletar</button>
      </div>
    );
  };
  
  export default DeleteTaskModal;
  