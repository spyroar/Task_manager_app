const mongoose=require('mongoose')
const db=process.env.DB_URL;

 mongoose.connect(db)
 .then(() => {
    console.log("db connected")
 }).catch((err) => {
    console.log("db not connected !",err)

 });