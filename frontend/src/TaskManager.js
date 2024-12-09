import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from "./api";
import { notify } from "./utils";
export default function TaskManager() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopytasks] = useState([]);
  const [updateTask,setUpdateTask]=useState(null)

  //  Search task 
  const handleSearch=(e)=>{
         let data=e.target.value.toLowerCase()
         console.log(data);
         const oldtask=[...copyTasks]
         const result=oldtask.filter((item)=>
                 item.taskName.toLowerCase().includes(data)
         )
         setTasks(result)
            
  }
     const handletask=()=>{
        if (updateTask && input){
            //  update call api
            const obj={
               taskName:input,
               isDone:updateTask.isDone,
               _id:updateTask._id
            }
            handleUpdateItem(obj)
            console.log("update call api");
            
        }else if(updateTask === null && input){
        //  create api call
        console.log("Create api call");
           hanldeAddTask()
        }
     }

    const handleUpdateItem=async(item)=>{
      const { _id, isDone, taskName } = item;
      const obj = {
        taskName,
        isDone: isDone,
      };
      try {
        const { success, message } = await updateTaskById(_id, obj);
        if (success) {
          // show success toast
          notify(message, "success");
        } else {
          // show error toast
          notify(message, "error");
        }
        setInput("");
        fetchAllTasks();
      } catch (error) {
        console.error(error);
        notify("Failed to update task", "error");
      }
    }
     useEffect(()=>{
         if (updateTask) {
          setInput(updateTask.taskName)
         }
     },[updateTask])
  const hanldeAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await createTask(obj);
      if (success) {
        // show success toast
        notify(message, "success");
      } else {
        // show error toast
        notify(message, "error");
      }
      setInput("");
      fetchAllTasks();
    } catch (error) {
      console.error(error);
      notify("Failed to create task", "error");
    }
  };
  const fetchAllTasks = async () => {
    try {
      const { data } = await getAllTasks();
      setTasks(data);
      setCopytasks(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      notify("Failed to create task", "error");
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);
  const deleteHandleTask = async (id) => {
    try {
      const { success, message } = await deleteTaskById(id);
      if (success) {
        // show success toast
        notify(message, "success");
      } else {
        // show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (error) {
      console.error(error);
      notify("Failed to delete task", "error");
    }
  };

  const handleCheckedAndUnchecked = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await updateTaskById(_id, obj);
      if (success) {
        // show success toast
        notify(message, "success");
      } else {
        // show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (error) {
      console.error(error);
      notify("Failed to update task", "error");
    }
  };

  return (
    <div className="d-flex flex-column align-item-center w-50 m-auto mt-5">
      <h1 className="mb-4 align-item-center">Task Manager App</h1>
      {/* Input and search box */}
      <div className="d-flex justify-content-between align-item-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-1"
            placeholder="Add a new task"
          />
          <button
            className="btn btn-success btn-sm me-2"
            onClick={handletask}
          >
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text"
           
          >
            <FaSearch />
          </span>
          <input
          onChange={(e)=> handleSearch(e)}
            type="text"
            className="form-control me-1"
            placeholder="Search task"
          />
        </div>
      </div>
      {/* List of Items  */}
      <div className="d-flex flex-column w-100">
        {tasks.map((item) => (
          <div
            key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3
        d-flex justify-content-between align-item-center
       "
          >
            <span className={item.isDone ? "text-decoration-line-through" : ""}>
              {item.taskName}
            </span>
            <div className="">
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleCheckedAndUnchecked(item)}
              >
                <FaCheck />
              </button>
               <button className="btn btn-primary btn-sm me-2"
                onClick={()=> setUpdateTask(item)}
               >
                <FaPencilAlt />
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => deleteHandleTask(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
