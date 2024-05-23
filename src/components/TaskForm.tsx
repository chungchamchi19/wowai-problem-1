import { useEffect, useState } from "react";
import { listStatus } from "../configs/status";
import { StatusEnum } from "../types/task";
import Select from "./Select";

type Props = {
  title: string;
  desc: string;
  status: StatusEnum;
  isInvalidTitle: boolean;
  handleChangeTitle: (value: string) => void;
  handleChangeDesc: (value: string) => void;
  setStatus: (value: StatusEnum) => void;
}

const TaskForm: React.FC<Props> = (props) => {
  const { title, desc, status, isInvalidTitle, handleChangeTitle, handleChangeDesc, setStatus } = props;
  const [isTypedTitle, setIsTypedTitle] = useState<boolean>(false);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChangeTitle(value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleChangeDesc(value);
  };

  useEffect(() => {
    if (title && !isTypedTitle) {
      setIsTypedTitle(true);
    }
  }, [title, isTypedTitle]);

  return (
    <div>
      <label className="block mb-2">Title</label>
      <input
        type="text"
        id="create_title"
        className="w-full p-2 rounded-md bg-transparent focus-visible:!outline-none border border-gray-600 mb-2 text-sm"
        placeholder="Task name"
        autoComplete="off"
        onChange={onChangeTitle}
        value={title}
      />
      {isInvalidTitle && isTypedTitle && <div className="text-red-500 mt-1 mb-2 text-sm">Title is required</div>}
      <label className="block mb-2">Description</label>
      <div>
        <textarea
          rows={5}
          className="w-full p-2 rounded-md bg-transparent focus-visible:!outline-none border border-gray-600 mb-2 text-sm resize-none"
          placeholder="Write something for description"
          onChange={onChangeDescription}
          value={desc}
        ></textarea>
      </div>
      <label>Status</label>
      <div className="text-sm">
        <Select
          list={listStatus}
          value={status}
          setValue={(value) => setStatus(value as StatusEnum)}
        ></Select>
      </div>
    </div>
  );
};

export default TaskForm;
