'use client';
import { useSession } from 'next-auth/react';
// import type { Metadata } from "next";


// export const metadata: Metadata = {
//     title: "Product"
// };

const Product = () => {
    const session = useSession();

    return (
        <div>
            <p> Welcome {session?.data?.user?.name}</p>
        </div>
    )
}

export default Product