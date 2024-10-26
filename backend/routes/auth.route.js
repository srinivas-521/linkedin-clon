import express from "express";
import { signup, login, logout, getcurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router= express.Router();

router.post("/signup", signup);
router.post("/login",login); // wasted half an hour here
router.post("/logout", logout)

router.get("/me",protectRoute , getcurrentUser)

export  default router;