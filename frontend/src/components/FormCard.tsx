import { useState } from 'react';
import { SignupType } from 'aaditya-npm-packeges-testing';
import { InputButton } from "./InputButton.tsx";
import { currentenvstate } from './InputButton.tsx';
import axios from 'axios';
import { Backend_Url } from '../config.tsx';
import {  Link, useNavigate  } from 'react-router-dom';



export const FormCard = ({ type }: { type: "Signup" | "Signin" }) => {
    const  navigate = useNavigate();    
    const [inputitems, setInputitems] = useState<SignupType>({
        username: "",
        password: "",
        name: ""
    });
    const [loading , setLoading ] = useState(false);
    const [error , setError] = useState(false);
    if(error)
    {
        return (<>
        
        <div className=' h-screen flex justify-center'>
            <div className = " h-screen flex flex-col justify-center">
                <div className="rounded-full bg-green-500 p-4 m-2 font-bold text-white">
                     <Link to='/signin' onClick={() => window.location.reload()}>Sign In</Link>
                </div>
                <div className=' rounded-full bg-blue-500 p-4 m-2 font-bold text-white'>
                   <Link to='/'  onClick={() => window.location.reload()} >Create Account</Link> 
                </div>
            </div>
            
            </div>
            
         
          
        </>)
    }
    if(loading)
    {
        return (
            <>
            <div className="flex flex-cols justify-center">
                <div className='flex justify-center'>
                Loading hudai chha 

                </div>
            </div>

           
            </>
        )
    }
    
    const clickhandler = async () => {
        try {
            setLoading(true);
            if( inputitems.username== ""||inputitems.password==""  )
            {
                setLoading(false);
                return alert("Field is empty")

            }
            const response = await axios.post(`${Backend_Url}/api/v1/user/${type === 'Signin' ? 'signin' : 'signup'}`, JSON.stringify(inputitems), {
                headers: {
                    'Content-Type': 'application/json'
                    ,
                    'Authorization':`${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            
            setLoading(false);
            console.log("Response from backend:", data);
            if (data.jwtvalue) {
                localStorage.setItem("token", data.jwtvalue);
            } else if (data.token) {
                localStorage.setItem("token", data.token);
            }
            // Navigating the routes according to the type
            (type === 'Signin')? navigate("/blog/") :  navigate("/signin");
        } catch (error) {
            
            console.error("An error occurred during the request:", error);
            setError(true);
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="flex-1">
                    <div className="font-black text-3xl">{type === 'Signup' ? "Create an account" : "Sign In"}</div>
                    {/* Taking the thing then sorting this all the element in the */}
                   {
                   type=='Signup'?<InputButton label='Name' placeholder="Enter your name" onChange={(e: currentenvstate) => {
                        setInputitems((inputitems) => {
                            return { ...inputitems, name: e.target.value };
                        });
                    }} />:null
                    } 
                    <InputButton label='Email' placeholder='Enter email' onChange={(e: currentenvstate) => {
                        setInputitems((inputitems) => {
                            return { ...inputitems, username: e.target.value };
                        });
                    }} />
                    <InputButton label='Password' placeholder="Enter Password" onChange={(e: currentenvstate) => {
                        setInputitems((inputitems) => {
                            return { ...inputitems, password: e.target.value };
                        });
                    }} />
                    <div className='flex-1'>
                        <button type="button" onClick={clickhandler} className="flex-1 mt-3 text-white font-bold bg-black-700 hover: focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900">{type === 'Signup' ? "Sign Up" : "Sign In"}</button>
                    </div>
                    <div>
                        {type === 'Signin' ? "Create An Account" : "Already have an account"}
                    </div>
                    <Links  navigate = {navigate }to={type === 'Signin' ? "Signup" : "Signin"} />
                </div>
            </div>
        </div>
    );
};

function Links({ to , navigate}: { to: string , navigate:any }) {
    const lower: string = to.toLowerCase();
    return (
        <div onClick={() => navigate(`/${lower}`)} className="underline underline-offset-1 hover:cursor-pointer focus:text-gray-300">
            {to}
        </div>
    );
}