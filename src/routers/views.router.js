import { Router } from "express";
import productManager from "../dao/dbmanagers/product.manager.js";
import messageManager from "../dao/dbmanagers/message.manager.js";
import cartManager from "../dao/dbmanagers/cart.manager.js";
import { isAdmin, isAuth, isGuest } from "../middlewares/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get("/", isGuest, (req, res) => {
  res.render("login", {
    title: "Iniciar sesión",
  });
});

viewsRouter.get("/products", [isAuth, isAdmin], async (req, res) => {
  const { user } = req.session;
  delete user.password;
  const role = req.session.isAdmin ? "admin" : "user";
  const { limit, page, category, availability, sort } = req.query;
  const prodList = await productManager.getProducts(
    limit,
    page,
    category,
    availability,
    sort
  );
  prodList.status = "success";
  prodList.category = category;
  prodList.availability = availability;
  prodList.sort = sort;
  prodList.prevLink = prodList.hasPrevPage
    ? `products?page=${prodList.prevPage}`
    : "";
  prodList.nextLink = prodList.hasNextPage
    ? `products?page=${prodList.nextPage}`
    : "";
    res.render("products", {
      title: "Listado de Productos",
      prodList,
      user: { ...user, role },
    });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.render("cart", cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const prodList = await productManager.getProducts();
  res.render("realTimeProducts", { prodList });
});

viewsRouter.get("/chat", async (req, res) => {
  const renderMessages = await messageManager.getMessages();
  res.render("chat", { renderMessages });
});

viewsRouter.get("/register", isGuest, (req, res) => {
  res.render("register", {
    title: "Registrar nuevo usuario",
  });
});

export default viewsRouter;