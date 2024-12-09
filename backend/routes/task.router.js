const { createTask, fetchAllTask,updateTask,deleteTask} = require("../controllers/task.controller.js");

const router = require("express").Router();

// get All task 
router.get("/",fetchAllTask);
// crete the task
router.post("/", createTask);
// update task

router.put('/:id',updateTask)
// delete task 
router.delete('/:id',deleteTask)

module.exports = router;
