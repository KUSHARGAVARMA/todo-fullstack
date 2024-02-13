const mongoose = require("mongoose");
const { boolean } = require("zod");
mongoose.connect("mongodb+srv://kushavrm:MWtGzh6L6mABQxfa@cluster0.ozuuqil.mongodb.net/todo");
const todoSchema = ({
    title:String,
    description : String,
    completed: Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports={
    todo
}