const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../utils/email");

const router = express.Router();

router.post("/forgot-password", async(req,res)=>{

    const {email}=req.body;


    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });


    if(!user){
        return res.json({
            message:"If the email exists, a reset link was sent"
        });
    }


    const token =
    crypto.randomBytes(32).toString("hex");


    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            resetToken:token,
            resetTokenExpiry:
            new Date(Date.now()+15*60*1000)
        }
    });


    await sendPasswordResetEmail(
        email,
        token
    );


    res.json({
        message:"Reset email sent"
    });

});

router.post("/register", async (req,res)=>{

    const {
        email,
        password,
        name,
        companyName,
        phoneNumber,
        emailConsent
    } = req.body;


    const passwordHash = await bcrypt.hash(password,10);


    const user = await prisma.user.create({
        data:{
            email,
            passwordHash,
            name,
            companyName,
            phoneNumber,
            emailConsent
        }
    });


    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );


    res.json({
        token,
        user:{
            id:user.id,
            email:user.email,
            role:user.role
        }
    });
});

router.post("/login", async (req,res)=>{

    const {email,password} = req.body;


    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });


    if(!user){
        return res.status(401).json({
            error:"Invalid email or password"
        });
    }


    const validPassword = await bcrypt.compare(
        password,
        user.passwordHash
    );


    if(!validPassword){
        return res.status(401).json({
            error:"Invalid email or password"
        });
    }


    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );


    res.json({
        token,
        user:{
            id:user.id,
            email:user.email,
            role:user.role
        }
    });

});


module.exports = router;