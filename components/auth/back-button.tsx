"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface State{
    label:string,
    href:string
}

export const BackButton=({
    label,
    href
}:State)=>{
    return(
        <div className="w-full">
            <Button
                variant='link'
                className="font-normal w-full"
                size='sm'
                asChild
            >
                <Link href={href}>
                    {label}
                </Link>
            </Button>
        </div>
    )
}