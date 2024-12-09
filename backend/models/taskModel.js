const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
      taskName:{
        type:String,
        required:true
      },
      isDone:{
         type:Boolean,
         required:true
      }
},{timestamps:true})

 const taskModel=mongoose.model('todo',taskSchema)

 module.exports=taskModel