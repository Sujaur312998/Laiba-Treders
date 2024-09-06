'use server';
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNo } = req.body
        try {
            const users = await prisma.user.findMany({
                where: { phoneNo: { contains: phoneNo, mode: 'insensitive' } },
            });
            
            if (users.length === 0) {
                return res.status(200).json({ message: 'Accepted' })
            } else {
                return res.status(401).json({ message: `${phoneNo} উক্ত নম্বরে গ্রাহক ইতিমধ্যে বিদ্যমান` })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error, message: 'Please Try Again' });
        }
    }

}