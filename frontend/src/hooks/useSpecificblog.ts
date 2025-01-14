import {useEffect, useState } from "react";
import { Backend_Url } from "../config";
import axios from 'axios'

interface Cardelement  {
    id:number,
    authorId:number,
    authorname:string,
    title:string,
    content:string
}
export const useSpecificblog  = (id:number)=>{
    const [loading , setLoading ] = useState(true);
    const [blogs,  setBlogs] = useState<Cardelement>();
    useEffect(()=>{
        axios.get(`${Backend_Url}/api/v1/blog/${id}`,{
            headers:{
              'Content-Type': 'application/json'
            }
        }).then((responce)=>{
            
            setBlogs(responce.data.data);
            setLoading(false);
        });

    },[]); // Add id as a dependency to ensure it runs only when id changes
    return{
        loading,
        blogs
    }
}