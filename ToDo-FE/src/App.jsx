import { useState } from 'react'
const App=() =>{
  const [formData , setFormData] = useState({
    label:"",
    description:"",
    completed:false
  })
  const handleChange=(e)=>{
    console.log(e.target.checked);
    const {name, value,checked,type}= e.target;
    const updatedValue = type === 'checkbox'?checked:value ;
    setFormData((prevData)=>({...prevData,[name]:updatedValue}));
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("submitted value", formData);

  }
//   const createTodo= zod.object({
//     title:zod.string(),
//     description:zod.string(),
//     completed : zod.boolean(),

// })


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  // alignItems:'center',
  justifyContent: 'space-between',
  maxWidth: '300px',
  margin: 'auto',
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
     <div><h3>Add Task</h3>
    </div>

    <form style={formStyle} onSubmit={handleSubmit}>
     <label style={labelStyle} htmlFor='label'>
      Title </label>
     <input style={inputStyle}
       type="text" 
       name='label'
       value={formData.label} 
       onChange={handleChange} 
     />
  
   <label style={labelStyle} htmlFor='description'>
      Description:   </label>

     <input style={inputStyle}
       type="text"
       name='description' 
       value={formData.description} 
       onChange={handleChange} 
     />

   <label style={labelStyle} htmlFor='completed'>
      
     <input style={inputStyle}
       type="checkbox" 
       name='completed'
       checked={formData.completed}
       onChange={handleChange} 
     />Completed</label>
   
    <button style={buttonStyle}
      type='submit'>Submit</button>
    </form>
  </>
  );

}
export default App
