
import { useParams } from "react-router-dom";
import { useSpecificblog } from "../hooks/useSpecificblog";
import {DetailBlog} from '../components/DetailBlog'

export const BlogDetail = ()=>{
    let { id } = useParams();
    const vara:number = Number(id)
    const {loading  , blogs} = useSpecificblog(vara);
    
   if(loading){
    return <>
    Loading .....
    </>
   }
    return (
        <>
        <div className='flex  justify-center mt-2'>
        <div className='flex flex-col justify-center'>
        {(blogs)?<>    
        <DetailBlog   id={blogs.id}
                 authorId={blogs.id}
                 authorname={blogs.authorname}
                 title={blogs.title}
                 content={blogs.content}>
                
        </DetailBlog></>:<></>}
          


        </div>
        </div>

          
         </>
    )
}

