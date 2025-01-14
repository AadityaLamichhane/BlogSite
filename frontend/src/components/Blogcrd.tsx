import {Link} from 'react-router-dom' 
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
         <div className="max-w-lg p-6 bg-white shadow border-gray-700">
                <div className="flex ">
                    <div className="relative inline-flex items-center justify-center w-8 h-8 ring-2 ring-gray-300 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className=" font-medium text-gray-600 dark:text-gray-300">{randomvariable.authorname[0]}</span>
                    </div>
                    <div className='font-semibold text-sm flex justify-center items-center mx-4'>
                    {randomvariable.authorname}
                    </div>
                    <div className=' text-gray-500 text-sm flex justify-center items-center '>Dec 28 , 2023</div>
                </div>
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-start ">{randomvariable.title.slice(0,100)}... </h5>
                </div>
                <p className="mb-3 font-normal text-gray-700 text-start">{randomvariable.content.slice(0,100)}...</p>
                <Link to={`/blog/${randomvariable.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>


        </>
    )
}