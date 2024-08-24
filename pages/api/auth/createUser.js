'use server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, f_name, phoneNo, address_village, address_home, password } = req.body;

    try {

      // Ensure phoneNo is an integer
      const phoneNoInt = parseInt(phoneNo);

      // Hash the password
      const hash_password = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          f_name,
          phoneNo: phoneNoInt,
          address_village,
          address_home,
          hash_password
        }
      });
      return res.status(201).json({ newUser, message: 'Registration Successfull' });
    } catch (error) {
      return res.status(500).json({ error, message: 'Please Try Again' });
    }
  }else{
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


