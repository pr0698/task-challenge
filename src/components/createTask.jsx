import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("A task more than 3 character ");
    // Create a new task object with a unique ID
    const newTask = {
      id: uuidv4(),
      name: task.name,
      status: "todo",
    };

    // Update the state using the functional form of setTasks
    setTasks((prev) => {
      // Ensure prev is an array before spreading
      const prevArray = Array.isArray(prev) ? prev : [];

      const newList = [...prevArray, newTask];
      localStorage.setItem("tasks", JSON.stringify(newList));
      return newList;
    });

    toast.success("Task created");

    // Clear the input field by updating the task state
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
          value={task.name}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <button className="bg-cyan-500 rounded-md px-4 h-12">Create</button>
      </form>
    </>
  );
};

export default CreateTask;
