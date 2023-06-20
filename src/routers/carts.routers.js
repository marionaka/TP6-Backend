import { Router } from "express";
import cartManager from "../dao/dbmanagers/cart.manager.js";

const cartsRouter = Router();


cartsRouter.post("/", async (req, res) => {
  try {
    res.send(await cartManager.addCart(req.body));
  } catch (err) {
    res.send(err);
  }
});


cartsRouter.post(":cid/product/:pid", async (req,res) => {
  try {
    res.send(await cartsManager.addProdToCart(req.params.cid, req.params.pid))
  } catch (err) {
    res.send(err);
  }
})


cartsRouter.get("/", async (req, res) => {
    try {
      res.send(await cartsManager.getCarts());
    } catch (err) {
        res.send(err);
    }
});


cartsRouter.get("/:cid", async (req, res) => {
    try {
        let cartReq = await cartsManager.getCartById(
        parseInt(req.params.cid)
        );
        if (cartReq != undefined) {
        res.send(cartReq);
        } 
    } catch (err) {
        res.send(err);
    }
});


cartRouter.put("/:pid", async (req, res) => {
  try {
    res
      .send(await cartsManager.updateCart(req.params.pid, req.body));
  } catch (err) {
    res.send(err);
  }
});


cartsRouter.delete("/:pid", async(req,res)=>{
    try {
        res.send(await cartsManager.deleteCart(parseInt(req.params.cid)))
    } catch (err) {
        res.send(err);
    }
})


export {cartsRouter};