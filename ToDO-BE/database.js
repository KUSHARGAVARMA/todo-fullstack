const mongoose = require("mongoose");
const { boolean } = require("zod");
mongoose.connect("");
const todoSchema = ({
    title:String,
    description : String,
    completed: Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports={
    todo
}