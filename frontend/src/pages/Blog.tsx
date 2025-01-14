import { BlogCard } from "../components/BlogCard"
// import {useState} from 'react'
import { Navigationbar } from "../components/Navigationbar"
export const Blog = ()=>
{
    // const [loading , setLoading ] = useState<Boolean>();

    // if (loading){
    //     return (
    //         <>
    //         ...Loading
    //         </>
    //     )
    // }

 
    return (
        <div>
            <Navigationbar/>     
              <BlogCard/>
        </div>
   
    )
}