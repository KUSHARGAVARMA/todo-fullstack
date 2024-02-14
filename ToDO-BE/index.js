const express = require('express')
const { createTodo, updateTodo } = require("./types");//for validation 
const app = express();//instantiating the express lib
app.use(express.json())// using the middleware

const cors = require('cors')
app.use(cors());
const { todo } =require("./database");

// what do i expect from my user to send 
// {
//     body {
//         title: string 
//         description: string
//     }
// }

app.post("/todo",async function(req,res){

    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong code"
        })
        return;
    }
    // put it in mongodb 
    const result = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed : createPayload.completed
    })
    res.json({
        msg:"Todo Is Created",
        result:result

    } )

})
app.get("/todo",async function(req,res){
    console.log("req");
    // const createPayload = req.body;

    // const parsedPayload = updateTodo.safeParse(createPayload);
    // if(!parsedPayload.success){
    //     res.status(411).json ({
    //         msg: "You sent the wrong code"
    //     })
    //     return;
    // }
    // get data from the database

    const result = await todo.find({})
    res.status(200).json({
        result
    }) 

})

app.put("/completed/:todo_id",async function(req,res){
    
    const result = await todo.updateOne({
        _id : req.params.todo_id
    },{
        completed:true
    })
    // put in mongodb


    // response
    res.json({
        msg:"Todo updated successfully ",
        
    })

})

app.delete("/todo/:todo_id",async function(req,res){

    const result = await todo.deleteOne({_id : req.params.todo_id})
    res.json({
        msg:"Deleted"
    })
})
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });