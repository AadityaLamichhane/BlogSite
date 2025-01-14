import { ChangeEvent, useState } from "react";

import {CreatePostType } from 'aaditya-npm-packeges-testing'
import axios from 'axios'
import { Backend_Url } from "../config";
import { useNavigate } from "react-router-dom";
type TypecreatePost = Omit<CreatePostType, 'userId'> 

type InputProps = {
    type: 'title'|'content',
    setInput: (input: (prevInput: { title: string; content: string}) => { title: string; content: string }) => void
}

export const CreateBlog = ()=>{
    const [input , setInput] = useState<TypecreatePost>({title:"",content:""});
    const navigate = useNavigate();
    

    return (
    <>
         
            <InputBlog type='title' setInput={setInput} />
            <InputBlog type='content' setInput={setInput} />
            <button  className='color text-white bg-stone-900 rounded-xl p-3 font-sm'onClick={()=>submithandle(input , navigate)}>Create New blog </button>
          
    </>

    )
}
function InputBlog({type ,setInput}:InputProps)
{
    return (
        <>
        <input 
            type="text" 
            className='border border-black border-1 m-2 p-2 rounded-xl text-center' 
            placeholder={`Enter the ${type}`} 
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setInput((prevInput)=>({...prevInput ,[type]:e.target.value }))
            }}
        />
       
        </>
    )
}


 const submithandle = async(input:TypecreatePost , navigate:any) => 
{
    
    // Code to hit the backend with the body of the input 
    const id = localStorage.getItem('token');
    const localstrVariable = localStorage.getItem('token');
    if (!localstrVariable) {
        return console.error("Local Storage is Empty, no token found");
    }
    try{
      
        const response = await axios.post(`${Backend_Url}/api/v1/blog/`,{...input,userId:id}, {           
            headers: {
                'Content-Type': 'application/json'
            }
        });   
        navigate("/blog");
        console.log("The responce of the data is ",response)       
    }
    catch(err)
    {
        console.error('Error Was detected in the code');
    }    

}
