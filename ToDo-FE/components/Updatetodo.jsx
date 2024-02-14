import React from "react";
import { buttonStyle } from "./style";
import './style.css' ;
import axios from "axios";
const Updatetodo=({todoList,onUpdateStatus})=>{
    const handleMarkAsCompleted = async (index) => {
        const updatedTodoList = [...todoList];//making the copy of the todoList
        console.log(updatedTodoList)
        const updatedTodo = { ...updatedTodoList[index], completed: true };//adding completed to true ,spreading the array of objects and on that index adding completed :true
        console.log(updatedTodo._id)
        updatedTodoList[index] = updatedTodo;// adding the object to the index
    
        // Update the todo list in the state
        onUpdateStatus(updatedTodoList);
    
        // Make a PUT request to update the server
        try {
          await axios.put(`http://localhost:3001/completed/${updatedTodo._id}`);
        } catch (error) {
          console.error('Error updating todo on server:', error);
          // Handle the error as needed
        }
      };
      const handleRemove = async (index) => {
        const updatedTodoList = [...todoList];//making the copy of the todoList
        const updatedTodo = { ...updatedTodoList[index]}//getting the object at that particualar index
        console.log(updatedTodo)
        


        try {
          await axios.delete(`http://localhost:3001/todo/${ updatedTodo._id}`);
        } catch (error) {
          console.error('Error updating todo on server:', error);
          // Handle the error as needed
        }

        updatedTodoList.splice(index,1);
        // Update the todo list in the state
        onUpdateStatus(updatedTodoList);
    
       
      };
    return(        
        <div className="App">
          {todoList.length===0?<p style={{textAlign:'center'}}> No Todos Added</p>:
        <table >
          <tbody>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Remove</th>
            </tr>
            {todoList.map((todo, index) => {
                return (
                    <tr key={index}>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td> {todo.completed ? (
                  <button disabled>Completed</button>
                ) : (
                  <button onClick={() => handleMarkAsCompleted(index)}>Mark as Completed</button>
                )}</td>  
                <td>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </td>
                </tr>
                )
            })}
            </tbody>
        </table>
}
    </div>
);
    
};
export default Updatetodo;

