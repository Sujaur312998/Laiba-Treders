'use server';
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNo } = req.body
        try {
            const user = await prisma.user.findUnique({
                where: {
                    phoneNo: parseInt(phoneNo)
                },
                select: {
                    phoneNo: true,
                },
            })
            if(user){
                return res.status(403).json({ message: `0${user.phoneNo} উক্ত নম্বরে গ্রাহক ইতিমধ্যে বিদ্যমান` })
            }else{
                return res.status(200).json({ message: 'Accepted' })
            }

        } catch (error) {
            return res.status(500).json({ error, message: 'Please Try Again' });
        }
    }

}