import axios from 'axios'
import { useState, useEffect } from 'react';
import { Backend_Url } from '../config';
interface Cardelement  {
    id:number,
    authorId:number,
    authorname:string,
    title:string,
    content:string
}
export const useBlogs = ()=>{
    const [loading , setLoading ] = useState(true);
    const [blogs,  setBlogs] = useState<Cardelement[]>([]);
    useEffect(()=>{
        axios.get(`${Backend_Url}/api/v1/blog/bulk`,{
            headers:{
              'Content-Type': 'application/json'
            }
        }).then((responce)=>{
            setLoading(false)
            setBlogs(responce.data)});

    },[]);
    return{
        loading,
        blogs
    }
}
