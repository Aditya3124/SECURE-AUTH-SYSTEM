import jwt from 'jsonwebtoken';

export const genrateTokenAndSetCookie = (res, newUserId) => {
  const token = jwt.sign({ id: newUserId }, process.env.JWT_SECRET, {
    expiresIn: '7d', 
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 7*24 * 60 * 60 * 1000, 
    sameSite: 'Strict', // Helps prevent CSRF attacks

  });
   return token;
}
