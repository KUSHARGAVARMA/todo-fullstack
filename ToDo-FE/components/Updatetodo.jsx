import React from "react";
import { buttonStyle } from "./style";
import './style.css' ;
import axios from "axios";
const Updatetodo=({todoList,onUpdateStatus})=>{
    const handleMarkAsCompleted = async (index) => {
        const updatedTodoList = [...todoList];
        const updatedTodo = { ...updatedTodoList[index], completed: true };
        updatedTodoList[index] = updatedTodo;
    
        // Update the todo list in the state
        onUpdateStatus(updatedTodoList);
    
        // Make a PUT request to update the server
        try {
          await axios.put(`http://localhost:3001/todo/${updatedTodo._id}`);
        } catch (error) {
          console.error('Error updating todo on server:', error);
          // Handle the error as needed
        }
      };
    return(        
        <div className="App">
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
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
                    </tr>
                )
            })}
        </table>
    </div>
);
    
};
export default Updatetodo;

