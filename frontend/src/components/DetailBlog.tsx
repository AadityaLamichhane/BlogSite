
interface Cardelement  {
    id:number,
    authorId:number,
    authorname:string,
    title:string,
    content:string
}
export const  DetailBlog=function(randomvariable:Cardelement)
{
    return (
        <>
         <div className="max-w-3xl p-6 bg-white  ">
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
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 text-start ">{randomvariable.title}... </h5>
                </div>
                <p className="mb-3 font-normal text-gray-700 text-start text-2xl">{randomvariable.content}...</p>
              
            </div>


        </>
    )
}