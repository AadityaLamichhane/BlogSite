import { BlogCard } from "../components/BlogCard"
// import {useState} from 'react'
import { Navigationbar } from "../components/Navigationbar"
export const Blog = ()=>
{

 
    return (
        <>
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-4 p-4">
            <div>
                <Navigationbar/>
            </div>
            <div>
                <BlogCard/>
            </div>
        </div>
                 </>
   
    )
}