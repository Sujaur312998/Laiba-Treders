'use server';
import prisma from "@/lib/prisma";


export default async function handler(req: any, res: any) {
    console.log("hit get customer");

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                f_name: true,
                role: true,
                phoneNo: true,
                address_village: true,
                address_home: true,
            }
        });
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({})
    }

}