import Modal from "../../../../components/Modal";
import TaskForm from "../../../../components/TaskForm";
import { Task } from "../../../../types/task";
import { useEditTask } from "./hooks/useEditTask";

type Props = {
  task: Task;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const EditTask: React.FC<Props> = (props) => {
  const { task, showModal, setShowModal } = props;
  const {
    title,
    desc,
    status,
    isInvalidTitle,
    handleChangeTitle,
    handleChangeDesc,
    setStatus,
    updateTask,
  } = useEditTask(task, { isEditing: showModal });

  return (
    <Modal
      isShow={showModal}
      modalTitle="Edit Task"
      confirmText="Save"
      cancelText="Cancel"
      show={() => setShowModal(true)}
      close={() => setShowModal(false)}
      confirm={updateTask}
      disableConfirm={isInvalidTitle}
    >
      <TaskForm
        title={title}
        desc={desc ?? ""}
        status={status ?? "todo"}
        isInvalidTitle={isInvalidTitle}
        handleChangeTitle={handleChangeTitle}
        handleChangeDesc={handleChangeDesc}
        setStatus={setStatus}
      ></TaskForm>
    </Modal>
  );
};

export default EditTask;
