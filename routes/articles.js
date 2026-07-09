const express = require("express");
const prisma = require("../lib/prisma");
const authenticate = require("../middleware/auth");

const router = express.Router();


router.get("/:id", authenticate, async (req,res)=>{

    const article = await prisma.article.findUnique({
        where:{
            id:Number(req.params.id)
        }
    });


    if(!article){
        return res.status(404).json({
            error:"Article not found"
        });
    }


    res.json(article);

});


module.exports = router;