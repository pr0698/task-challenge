import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const todos = tasks?.filter((task) => task?.status === "todo");
    const fInProgres = tasks?.filter((task) => task?.status === "inprogress");
    const fClosed = tasks?.filter((task) => task?.status === "closed");

    setTodos(todos);
    setInProgress(fInProgres);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inprogress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

// const Task = ({ task, tasks, setTasks }) => {
//     const [{ isDragging }, drag] = useDrag(() => ({
//       type: "task",
//       item: { id: task.id },
//       collect: (monitor) => ({
//           isDragging: monitor.isDragging(),
//       }),
//     }));

const Section = ({ status, tasks, setTasks, todos, inprogress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item?.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    tasksToMap = inprogress;
  }

  if (status === "closed") {
    text = "closed";
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    // Implement your logic for adding an item to the section
    // console.log("dropped",id);
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) return { ...t, status: status };
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("Task status changed ");
      return mTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      {tasksToMap?.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task?.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      {""}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-md flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("task removed");
  };

  const handleEdit = (id) => {
    
  }

  const [display, setDisplay] = useState(false);
  const showButton = (e) => {
    e.preventDefault();
    setDisplay(true);
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay(false);
  };

  

  const styles = {
    editButton: {
      bottom: "17px",
      right: "20%",
    },
    deleteButton: {
      bottom: "14px",
    },
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 m-8 shadow-md rounded-md  ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab`}
      onMouseEnter={(e) => showButton(e)}
      onMouseLeave={(e) => hideButton(e)}
    >
      <p>{task?.name}</p>
      {display && (
        <div>
          <button
            className="absolute bottom-1 right-1 text-slate-400"
            onClick={() => handleEdit(task?.id)}
            style={styles.editButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="absolute bottom-1 right-1 text-slate-400"
            onClick={() => handleRemove(task?.id)}
            style={styles.deleteButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ListTasks;
