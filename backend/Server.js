import express from "express"
import colors from "colors"
import cors from "cors"
import path from "path";
import connectToDatabase from "./DB.js";
const app = express()
app.use(express.json());
app.use(cors());


connectToDatabase();


app.get("/", () => {
    console.log("yay,,its workking")
})

const PORT =  5000;
app.listen(PORT, () => {
    console.log(`<==server started on port==> ${PORT}`.yellow.underline.bold) 
})