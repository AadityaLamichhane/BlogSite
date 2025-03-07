

interface Cardelement  {
    id:number,
    authorId:number,
    authorname:string ,
    title:string,
    content:string
}
export const  Blogcrd=function(randomvariable:Cardelement)

{
    return (
        <>
        <div className='flex flex-col justify-cennter w-full  '>
          <div className="flex justify-center  items-center ">
          {/* <div className=" flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg  w-95 md:w-100 lg:w-150"> */}
          <div className="flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-[95%] md:w-[60%] lg:w-[65%] ">
            {/* <div className="flex h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="card-image" />
            </div> */}
       <div className="text-justify max-w-4xl mx-auto px-4">
          <h1 className="text-center text-3xl font-bold my-6">
            {randomvariable.title}
          </h1>
          
          <p className="text-justify break-all">
            {randomvariable.content.length>250?randomvariable.content.slice(0,250)+"...":randomvariable.content}
          </p>    
          <div className="flex justify-center my-6">
            <button className="bg-slate-800 text-white py-2 px-4 rounded-lg">Read more</button>
          </div>
</div>
          </div>  

          </div>
        </div>
          
          

        </>
    )
}