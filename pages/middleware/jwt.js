import jwt from 'jsonwebtoken';


const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

// "7 days"
export const generateAccessToken = (user) => {
  return  jwt.sign(user, SECRET_KEY,{ algorithm: 'HS512' }, { expiresIn: '5m' });
};

export const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_SECRET_KEY,{ algorithm: 'HS512' },{ expiresIn: "1 days"});
};
