    import express from "express";
    import { protectRoute } from "../middlewares/auth.middleware.js";
    import { sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest , getAllConnectionRequests,getUserConnections, removeConnection, getConnectionStatus } from "../controllers/connection.controller.js";

    console.log("i have reached here")
    const router= express.Router();

    
    router.post("/request/:userId",protectRoute,sendConnectionRequest);
    router.put("/accept/:requestId",protectRoute,acceptConnectionRequest);
    router.put("/reject/:requestId",protectRoute,rejectConnectionRequest);

    //get all connection requests 
    router.get("/requests",protectRoute,getAllConnectionRequests);
    //get connections of a user
    router.get("/",protectRoute,getUserConnections);
    router.delete("/:userId",protectRoute,removeConnection);
    router.get("/status/:userId", protectRoute, getConnectionStatus);
   


    export default router;