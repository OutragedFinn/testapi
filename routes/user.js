const express = require("express");
const prisma = require("../lib/prisma");
const authenticate = require("../middleware/auth");

const router = express.Router();


router.get("/me", authenticate, async (req,res)=>{

    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        },
        select:{
            id:true,
            email:true,
            role:true
        }
    });


    if(!user){
        return res.status(404).json({
            error:"User not found"
        });
    }
    
    res.json(user);

});

router.get("/profile", authenticate, (req,res)=>{

    res.json({
        message:"You are logged in",
        user:req.user
    });

});


module.exports = router;