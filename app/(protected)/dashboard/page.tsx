'use client';
import { useSession } from 'next-auth/react';


const Dashboard=()=>{
    const session = useSession();
    return(
        <div>
            Dashboard here {session?.data?.user?.name}
        </div>
    )
}

export default Dashboard