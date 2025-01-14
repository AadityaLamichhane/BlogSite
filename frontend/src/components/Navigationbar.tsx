import { NavLink } from "react-router-dom"
export const Navigationbar = ()=>{
    return (
        <>
          <div className="border-b-2 p-1">
                <div className="flex justify-between">
                    <NavLink to='/signin' onClick={()=>localStorage.removeItem('token')}>Log out</NavLink>
                    <div className="flex items-center">
                        <NavLink to="/createBlog">
                            <button className="text-white font-bold bg-green-500 p-3 rounded-lg">Add Post</button>
                        </NavLink>
                        <div className="relative inline-flex items-center justify-center w-10 h-10 ring-2 ring-gray-300 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ml-3">
                            <span className="p-2 font-medium text-gray-600 dark:text-gray-300">User</span>
                        </div>
                    </div>
                </div>
             </div>  
        </>
    )
}