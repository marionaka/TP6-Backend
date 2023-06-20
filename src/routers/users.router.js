import { Router } from "express";
import userManager from "../dao/dbmanagers/user.manager.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userManager.createUser(userData);
    res.send("Registro exitoso!");
  } catch (err) {
    res.send(`Error al crear un usuario: ${err}`);
  }
});

userRouter.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userManager.getByEmail(email);
    if (!user)
      throw new Error("El email no encontrado. Registrese");
    if (user.password !== password)
      throw new Error("La contraseña es incorrecta");
    req.session.user = user;
    res.redirect("/products");
  } catch (err) {
    res.send(`Error al iniciar sesión: ${err}`);
  }
});

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default userRouter;
