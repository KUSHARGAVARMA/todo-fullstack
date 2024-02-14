import { useEffect, useState } from 'react'
import axios from 'axios';
import Updatetodo from '../components/Updatetodo';
import { formStyle,labelStyle,buttonStyle,inputStyle } from './app_style.js';
const App=() =>{
  const [formData , setFormData] = useState({
    title:"",
    description:"",
    completed:false
  })
  const [todoList , setTodoList] = useState([])
  const handleChange=(e)=>{
    console.log(e.target.checked);
    const {name, value}= e.target;
    const updatedValue = value ;
    setFormData((prevData)=>({...prevData,[name]:updatedValue}));
  
  };
  const sendDataToApi = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/todo', data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getData = async () =>{
    try{
      const response = await axios.get('http://localhost:3001/todo');
      return response;
    } catch(error){
      throw error
    }
  };

  const onUpdateStatus = (updatedTodoList) => {
    setTodoList(updatedTodoList);

  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("submitted value", formData);
    try {
      const response = await sendDataToApi(formData);
      
      setFormData({
        title:"",
        description:"",
        completed:false
      });
      setTodoList((prevData)=>([...prevData,response.data.result]));
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
   
    

  }
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await getData();
        console.log('API Response:', response.data.result);
        const result = response.data.result;

  
        // Ensure result is an array before updating the state
   
          setTodoList(result);
        
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
  
    fetchData(); // Call the async function

  
    // get the list of todos
    console.log(todoList);
 
  }, []);
  

  return(
    <>
    <div>
      <h2>Task Tracker</h2>
    </div>


    <form style={formStyle} onSubmit={handleSubmit}>
     <label style={labelStyle}>
      Title </label>
     <input style={inputStyle}
       type="text" 
       name='title'
       value={formData.title} 
       onChange={handleChange} 
     />
  
   <label style={labelStyle} >
      Description:   </label>

     <input style={inputStyle}
       type="text"
       name='description' 
       value={formData.description} 
       onChange={handleChange} 
     />


    <button style={buttonStyle}
      type='submit'>Submit</button>
    </form>
    <Updatetodo todoList={todoList} onUpdateStatus={onUpdateStatus}/>

  </>
  );

}
export default App
