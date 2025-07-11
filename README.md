# 🔐 2FA Authentication System

A secure and modern Two-Factor Authentication (2FA) system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This project implements a robust authentication workflow including:

✅ User registration & login  
✅ Password hashing & validation  
✅ Email verification  
✅ OTP-based 2FA (via email)  
✅ Secure JWT sessions with cookies  
✅ Password reset

---

## 🗂️ Features
- **Hashed Passwords: Using `bcrypt`
- **JWT Authentication: Secure tokens with HTTP-only cookies
- **Email Service:** Nodemailer for sending verification and OTP emails
- **Environment Variables:** Managed via `.env`


---

| **Technology**         | **Description**                                              |
| ---------------------- | ------------------------------------------------------------ |
| **MongoDB**            | NoSQL database for storing user data, OTPs, and session info |
| **Express.js**         | Node.js web framework for building RESTful APIs              |
| **React.js**           | Frontend framework for building responsive UIs               |
| **Node.js**            | JavaScript runtime for the backend server                    |
| **bcryptjs**           | Library for hashing passwords securely                       |
| **jsonwebtoken (JWT)** | Secure, stateless authentication tokens                      |
| **nodemailer**         | Node.js module for sending verification & OTP emails         |
| **dotenv**             | Loads environment variables from `.env` files                |
| **cors**               | Enables secure cross-origin requests                         |
| **cookie-parser**      | Parses HTTP cookies for managing JWTs                        |
| **Mongoose**           | MongoDB ODM for schema modeling and queries                  |


## .env.sample file 



