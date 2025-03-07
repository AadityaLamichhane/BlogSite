
import { useBlogs } from '../hooks/useBlogs'

import {Blogcrd} from './Blogcrd'
interface Cardelement  {
    id:number,
    authorId:number,
    authorname:string,
    title:string,
    content:string
}
export const BlogCard = ()=>{
        const {loading , blogs }  = useBlogs();
        if(loading)
        {
            return (<>
            ...Loading
            </>)
        }
    return (

        <>   
            {
       blogs.map((e:Cardelement)=>{
        return (<>
        
        <Blogcrd 
          id={e.id}
          authorId={e.authorId}
          authorname={e.authorname || "Anonymous"}
          title={e.title}
          content={e.content}
        />

        
    
        </>)
       })
  }
       

        </>
    ) 
}