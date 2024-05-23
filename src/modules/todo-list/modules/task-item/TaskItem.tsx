import { TrashIcon } from "../../../../assets";
import { statusColorCSS } from "../../../../configs/status";
import { Task } from "../../../../types/task";
import { upperFistChar } from "../../../../utils/string";

type Props = {
  task: Task;
  onEditing: (task: Task) => void;
  onDeleting: (task: Task) => void;
}

const TaskItem: React.FC<Props> = (props) => {
  const { task, onEditing, onDeleting } = props;

  const handleEditing = () => {
    onEditing(task);
  };

  const handleDeleting = () => {
    onDeleting(task);
  };

  return <div className="flex justify-between py-2 border-b border-gray-600 gap-2">
    <div className="flex items-center gap-2 w-full cursor-pointer" onClick={handleEditing}>
      <div className={`w-4 h-4 rounded-full ${statusColorCSS[props.task.status]}`}>
      </div>
      <span>{upperFistChar(props.task.title)}</span>
    </div>
    <div className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-sm hover:bg-gray-500" onClick={handleDeleting}>
      <TrashIcon></TrashIcon>
    </div>
  </div>;
};

export default TaskItem;
