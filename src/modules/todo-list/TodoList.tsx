import EditTask from "./modules/edit-task/EditTask";
import TaskItem from "./modules/task-item/TaskItem";
import DeleteTask from "./modules/delete-task/DeleteTask";
import { statusColorCSS } from "../../configs/status";
import { useTodoList } from "./hooks/useTodoList";

const TodoList: React.FC = () => {
  const {
    taskGroups,
    onEditTask,
    onDeleteTask,
    editingTask,
    showModalEdit,
    setShowModalEdit,
    deletingTask,
    showModalDelete,
    setShowModalDelete,
    getStatusLabel,
  } = useTodoList();


  return <div>
    {taskGroups.map((group) => {
      return (
        <div key={group.status} className="mb-4">
          <div className={`rounded-md py-1 px-3 ${statusColorCSS[group.status]} w-fit`}>
            <span>{getStatusLabel(group.status)}</span>
          </div>
          {group.tasks.map((task) => {
            return <TaskItem key={task.id} task={task} onEditing={onEditTask} onDeleting={onDeleteTask}></TaskItem>;
          })}
        </div>
      );
    })}
    {editingTask && <EditTask task={editingTask} showModal={showModalEdit} setShowModal={setShowModalEdit}></EditTask>}
    {deletingTask && <DeleteTask task={deletingTask} showModal={showModalDelete} setShowModal={setShowModalDelete}></DeleteTask>}
  </div>;
};

export default TodoList;