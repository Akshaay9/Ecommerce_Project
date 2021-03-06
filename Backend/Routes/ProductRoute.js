import express from "express";
import { getIndividualProduct } from "../Middlewears/GetIndividualProduct.js";
import Products from "../Models/ProductsModel.js";
import Cart from "../Models/CartModel.js"
const router = express.Router();

router.param("productID",getIndividualProduct);

router.get("/mensNewDrop",async (req, res) => {
  const products = await Products.find({"category":"MensNewDrop"});
  res.json(products);
});
router.get("/womensNewDrop",async (req, res) => {
  const products = await Products.find({"category":"womensNewDrop"});
  res.json(products);
});
router.get("/homeWorkout",async (req, res) => {
  const products = await Products.find({"category":"homeWorkout"});
  res.json(products);
});
router.get("/gymAccessories",async (req, res) => {
  const products = await Products.find({"category":"gymAccessories"});
  res.json(products);
});
router.get("/resistanceTrainingEquipment",async (req, res) => {
  const products = await Products.find({"category":"resistanceTrainingEquipment"});
  res.json(products);
});
router.get("/yogaEquipment",async (req, res) => {
  const products = await Products.find({"category":"yogaEquipment"});
  res.json(products);
});
router.get("/all",async (req, res) => {
    const products = await Products.find( { $or:[ {'category':'resistanceTrainingEquipment'}, {'category':'yogaEquipment'}, {'category':'gymAccessories'}, {'category':'homeWorkout'} ]})
    
  res.json(products);
});

router.get("/search", async(req, res) => {
  const data = await Products.find({})
  

  res.json(data)
})

router.get("/:productID", async (req, res) => {
  const { singleProduct } = req;
  res.json(singleProduct)
})

export default router;
