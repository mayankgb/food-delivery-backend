import { PrismaClient } from "@prisma/client";
import express from "express"
import z from "zod"

export const itemsRouter = express.Router();

const prisma = new PrismaClient()

const itemsInput = z.object({
    type:z.string().min(1),
    itemPrice:z.number().min(1),
    description:z.string().min(1),
    perKmCost:z.number().optional(),
    name:z.string(),
    orgId:z.number(),
    zone:z.string(),
    baseDistance:z.number().optional(),
    fixPrice:z.number().optional()
})

itemsRouter.post("/createitem",async(req,res)=>{
    const body = req.body
    const {success} = itemsInput.safeParse(body);
    if (!success) {
        return res.json({
            message:"Invalid inputs"
        })
    }

    try{
        const existingItem = await prisma.item.findFirst({
            where:{
                name:body.name
            }
        })
        if (existingItem) {
            return res.json({
                message:"Item already exists"
            })
        }
        
        const newItem = await prisma.item.create({
            data:{
                itemPrice:body.itemPrice,
                name:body.name,
                type:body.type,
                description:body.description,
            }
        })
        let perKmPrice:number= 0;;

        if (newItem.type=="perishable") {
            perKmPrice=150 //cents
        }else if(newItem.type=="non_perishable"){
            perKmPrice=100
        }
    
        const deliveryPricing = await prisma.pricing.create({
            data:{
                zone:body.zone,
                organization_id:body.orgId,
                item_id:newItem.id,
                fix_price:body.fixPrice,
                base_distance_in_km:body.baseDistance,
                km_price:body.perKmCost|perKmPrice
            }
        })
    
        return res.json({
            id:newItem.id,
            name:newItem.name,
            message:"Successfully created item"
        })
    }catch(e){
        console.log(e)
        return res.json({
            message:e
        })
    }
})