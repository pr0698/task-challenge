import React, { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file for styling
import CreateTask from "./createTask";
import ListTasks from "./ListTasks";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks, "tasks");
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>
  );
};

export default Home;
