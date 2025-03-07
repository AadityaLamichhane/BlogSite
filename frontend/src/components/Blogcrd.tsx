

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
        <div className='flex flex-col justify-cennter'>
          <div className="flex justify-center items-center">
          <div className=" flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            {/* <div className="flex h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="card-image" />
            </div> */}
            <div className="p-4 ">
              <h6 className="mb-4 text-slate-800 text-2xl font-semibold">
                {randomvariable.title}
              </h6>
              <p className="text-slate-700 text-justify leading-normal font-light text-lg ">
              {randomvariable.content.slice(0,200)}
              </p>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Read more
              </button>
            </div>
          </div>  

          </div>
        </div>
          
          

        </>
    )
}