import express from "express";
import { priceRouter } from "./routes/deliveryCost";
import { orgRouter } from "./routes/organization";
import { itemsRouter } from "./routes/items";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/checkout",priceRouter)

app.use("/org",orgRouter)

app.use("/items",itemsRouter)


app.listen(port,()=>{
    console.log("app is listening");
})