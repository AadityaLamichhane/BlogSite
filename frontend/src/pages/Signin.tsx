import { FormCard } from "../components/FormCard"
import { Quote } from "../components/Quote"
export const Signin = ()=>{
    return (
        <>
        <div className="grid grid-cols-3">
          
           
            <div className="col-span-3 lg:col-span-2"> 
                <FormCard  type="Signin"/>
            </div>
            
            <div className="col-span-1 invisible lg:visible">
                <Quote/>
            </div>
            
        </div>
        
        </>
    )
}