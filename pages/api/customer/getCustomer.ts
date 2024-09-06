'use server';
import prisma from "@/lib/prisma";


export default async function handler(req: any, res: any) {
    const { phoneNo, address_village } = req.body

    if (phoneNo || address_village) {
        const searchUser = await prisma.user.findMany({
            where: {
                AND: [
                    { address_village: { contains: address_village, mode: 'insensitive' } },
                    { phoneNo: { startsWith: phoneNo } },
                    { role: { in: ["NEW_CUSTOMER", "GENERAL_CUSTOMER", "ACTIVE_CUSTOMER"] } }
                ]
            },
            select: {
                id: true,
                name: true,
                f_name: true,
                role: true,
                phoneNo: true,
                address_village: true,
                address_home: true,
            },
            orderBy: {
                short_id: 'desc' // or 'desc' for descending order
            }
        });
        return res.status(200).json(searchUser);
    }

    try {

        const users = await prisma.user.findMany({
            where: { role: { in: ["NEW_CUSTOMER", "GENERAL_CUSTOMER", "ACTIVE_CUSTOMER"] } },
            select: {
                id: true,
                name: true,
                f_name: true,
                role: true,
                phoneNo: true,
                address_village: true,
                address_home: true,
            },
            orderBy: {
                short_id: 'desc' // or 'desc' for descending order
            }
        });
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({})
    }

}