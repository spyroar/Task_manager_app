const taskModel = require("../models/taskModel.js");
const createTask = async (req, res) => {
  try {
    const { isDone, taskName } = req.body;
    // console.log(data);
    const data = new taskModel({
      taskName,
      isDone,
    });

    await data.save();

    res.status(201).json({ message: "task is created", success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "failed to create task",
        success: false,
        err: error.message,
      });
  }
};

const fetchAllTask = async (req, res) => {
    try {
      
      const data = await taskModel.find({});
  
      res.status(200).json({ message: "fetch all task", success: true,data });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "failed to fetch all data",
          success: false,
          err: error.message,
        });
    }
  };

  
const updateTask = async (req, res) => {
    try {
       const id=req.params.id;
       let body=req.body
       const updatedData={$set:{...body}};
       await taskModel.findByIdAndUpdate(id,updatedData);
  
      res.status(200).json({ message: "updated task", success: true });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "failed to update task",
          success: false,
          err: error.message,
        });
    }
  };
  
const deleteTask = async (req, res) => {
    try {
      let id=req.params.id
       await taskModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Task deleted", success: true });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "failed to delete task",
          success: false,
          err: error.message,
        });
    }
  };
module.exports = {
  createTask,
  fetchAllTask,
  updateTask,
  deleteTask
};
