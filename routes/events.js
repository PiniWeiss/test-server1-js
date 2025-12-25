import express from "express";
import { createEvent } from "../controllers/events.js";

const router = express.Router();
    

router.route("/events").post(createEvent)


export default router;