import express from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app= express();
app.use(express.json());
app.post('/',async(req,res)=>{
    const data = req.body;

    console.log(`Given body is ${JSON.stringify(data)}`);

const user = await prisma.user.create({
    data:{
        username:"Random Username",
        password:"password"
    }
})

console.log(`The given user is ${JSON.stringify(data)}`);
return res.status(200).json({msg:"This is correctly running the code"})
})
app.listen(3000 , ()=>{
    console.log("LIstening to the port ");

});
