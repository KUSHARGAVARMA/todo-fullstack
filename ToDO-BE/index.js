const express = require("express");
const { createTodo, updateTodo } = require("./types");//for validation 
const app = express();//instantiating the express lib
app.use(express.json);// using the middleware
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
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed : createPayload.completed
    })
    res.json({
        msg:"Todo Is Created"
    } )

})
app.get("/todo",async function(req,res){
    const createPayload = req.body;

    const parsedPayload = updateTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json ({
            msg: "You sent the wrong code"
        })
        return;
    }
    // get data from the database

    const result = await todo.find({})
    res.status(200).json({
        result
    }) 

})

app.put("/completed",async function(req,res){
    const updatedPayload = req.body;
    const parsedUpPayload = updatePayload.safeParse(updatedPayload);

    if(!parsedUpPayload.success){
        res.status(411).json({
            msg:"You sent the wrong id datatype"
        })
    }
     // put in mongodb
    const result = await todo.update({
        _id : req.body.id
    },{
        completed:true
    })
    // response
    res.json({
        msg:"Todo updated successfully"
    })

})