import CustomerList from '@/components/protectedAuth/customer/CustomerList'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customer List"
};

const List =()=>{
    return (
        <div className='w-full overflow-y-auto'>
            <CustomerList />
        </div>
    )
}


export default List