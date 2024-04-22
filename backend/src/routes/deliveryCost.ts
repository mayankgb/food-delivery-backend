import { PrismaClient } from "@prisma/client";
import express from "express"
import z from "zod"

export const priceRouter = express.Router();

const prisma = new PrismaClient();

const UserInput = z.object({
    zone:z.string().min(1),
    organization_id:z.number(),
    total_distance:z.number(),
    item_type:z.string(),
    item_id:z.number(),
})




priceRouter.get("/totalprice",async(req,res)=>{
    const body = req.body
    const {success} = UserInput.safeParse(body)

    if (!success) {
        return res.json({
            error:"Invalid Inputs"
        })
    }

    const total_distance = body.total_distance;
    try{
        const cost = await prisma.pricing.findFirst({
            where:{
                zone:body.zone,
                organization_id:body.organization_id,
                item_id:body.item_id,
                item:{
                    type:body.item_type
                },
            },
            select:{
                base_distance_in_km:true,
                fix_price:true,
                item:{
                    select:{
                        itemPrice:true
                    }
                },
                km_price:true
            }
        })
    
        if(!cost){
            return res.json({
                error:"delivery Cost is not available"
            })
        }
    
        const itemPrice = cost.item.itemPrice;
    
        if (cost.base_distance_in_km>=total_distance) {
            return res.json({
                total_price:`${(itemPrice + cost.fix_price)/100} Euros`
            })
        }
        const price = (cost.km_price*total_distance) + itemPrice;
    
        return res.json({
            total_price:`${price/100} Euros`
        })
    }catch(e){
        return res.json({
            error:"somwthing went wrong"
        })
    }
})