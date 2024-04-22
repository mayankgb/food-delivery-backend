import { PrismaClient } from "@prisma/client"
import express from "express"
import z from "zod"

export const orgRouter = express.Router()

const prisma = new PrismaClient()

const orgInput = z.object({
    name:z.string().min(1)
})

orgRouter.get("/get",async(req,res)=>{
    const allOrg = await prisma.organization.findMany({})

    return res.json({
        allOrg
    })
})

orgRouter.post("/create",async(req,res)=>{
    const body = req.body
    const {success} = orgInput.safeParse(body);

    if (!success) {
        return res.json({
            error:"Invalid Inputs"
        })
    }

    try{
        const existingOrg = await prisma.organization.findFirst({
            where:{
                name:body.name
            }
        })
    
        if (existingOrg) {
            return res.json({
                message:"Organization already exists with this name try with another name"
            })
        }
    
        const newOrg = await prisma.organization.create({
            data:{
                name:body.name
            }
        })
        return res.json({
            id:newOrg.id,
            name:newOrg.name
        })
    }catch(e){
        return res.json({
            message:"something went wrong please try again later"
        })
    }
    
})
