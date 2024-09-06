'use server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, f_name, phoneNo, address_village, address_home, password } = req.body;
    try {
      // Hash the password
      const hash_password = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          f_name,
          phoneNo,
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


