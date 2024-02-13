import { useEffect, useState } from 'react'
import axios from 'axios';
import Updatetodo from '../components/Updatetodo';
const App=() =>{
  const [formData , setFormData] = useState({
    title:"",
    description:"",
    completed:false
  })
  const [todoList , setTodoList] = useState([])
  const handleChange=(e)=>{
    console.log(e.target.checked);
    const {name, value,checked,type}= e.target;
    const updatedValue = type === 'checkbox'?checked:value ;
    // send data to api 
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
    // Create a copy of the todo list and remove the todo at the specified index
    // const updatedTodoList = [...todoList];
    // updatedTodoList.splice(index, 1);

    // Update the todo list in the state
    setTodoList(updatedTodoList);

    // Make a PUT request to update the server
    // You need to implement this part based on your API
    // axios.put('your-api-endpoint', { id: todoList[index].id, completed: true });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("submitted value",typeof formData);
    setTodoList((prevData)=>([...prevData,formData]));

    try {
      const response = await sendDataToApi(formData);
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
  

//   const createTodo= zod.object({
//     title:zod.string(),
//     description:zod.string(),
//     completed : zod.boolean(),

// })


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  // // alignItems:'center',
  justifyContent: 'space-between',
  maxWidth: '300px',
  // margin: 'auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};
  return(
    <>
    <div>
      <h2>Todo Application</h2>
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
