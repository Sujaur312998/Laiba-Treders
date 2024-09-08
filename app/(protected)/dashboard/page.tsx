import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default:"Dashboard",
        // absolute:"",
        template:"Dashboard %s",
    }
};

const Dashboard=()=>{
    return(
        <div>
            Dashboard here 
        </div>
    )
}

export default Dashboard