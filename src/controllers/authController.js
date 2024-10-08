const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




    




const signup = async (req,res)=>{

    const {userName,email,passwordHash} = req.body
    const hashedPassword  = await bcrypt.hash(passwordHash, 10);


    try{
        const existUser = await prisma.users.findUnique({
            where:{email:email},
        });
        if (existUser) {
            
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = await prisma.users.create({
            data:{userName,email,passwordHash: hashedPassword}, });

        res.status(201).json(newUser);
        }

        catch (error) {
            
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    };






    const login = async (req, res) => {
        const { email, passwordHash } = req.body; // Retrieve email and password from request body
    
        try {
            // Find the user by email
            const existUser = await prisma.users.findUnique({
                where: { email: email },
            });
    
            if (!existUser) {
                console.log('User not found');
                return res.status(400).json({ error: 'Email not found' });
            }
    
            // Compare the provided password with the stored hashed password in the database
            const passwordMatch = await bcrypt.compare(passwordHash, existUser.passwordHash);
            if (!passwordMatch) {
                // Passwords do not match
                console.log('Password does not match');
                return res.status(400).json({ error: 'Incorrect password' });
            }
    
            // If login is successful
            
            
    
            //generate token
            const token = jwt.sign({id:existUser.id},process.env.JWT_SECRET,{expiresIn:'1h'});
            console.log('Login successful');
            console.log('Token = ',token);
    
            res.status(200).json({token})
            
    
    
    
            
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'An error occurred while logging in' });
        }
    };



    module.exports = { signup, login };