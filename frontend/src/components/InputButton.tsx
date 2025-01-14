import { ChangeEvent } from "react";
export type currentenvstate = ChangeEvent<HTMLInputElement>;

export interface InputButtonTypes {
    label: string ,
    placeholder:string ,
    onChange: (e :currentenvstate)=>void
}
export const InputButton  = ({label , placeholder , onChange}:InputButtonTypes)=>{
    return (
        <div className="flex justify-center items-center mt-2">
            <div className="px-3 max-w-sm w-full"> 
                <label className="block mb-2 text-md font-lg font-bold text-gray-900 text-left ml-1"> {label}</label>
                {label=='Password'?<>
                    <input type="password" id="first_name" onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500" placeholder={placeholder} required />

                </>:<>
                    <input type="text" id="first_name" onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500" placeholder={placeholder} required />
                    </>}
            </div>
        </div>
    )
}
