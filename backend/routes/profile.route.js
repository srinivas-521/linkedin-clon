import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getSuggestedConnections,getPublicProfile, updateProfile} from "../controllers/user.controller.js";

const router =express.Router();


router.get("/:username", protectRoute , getPublicProfile);



export default router;
