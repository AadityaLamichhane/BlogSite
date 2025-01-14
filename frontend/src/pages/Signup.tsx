import { FormCard } from "../components/FormCard";
import { Quote } from "../components/Quote";

export const Signup = () => {
    return (
        <div className="grid grid-cols-3">
            
            <div className="col-span-3 lg:col-span-2 ">
            <FormCard type="Signup" />
            </div>
            
            <div className=" col-span-1 invisible lg:visible">
            <Quote />

            </div>
        </div>
    );
};

