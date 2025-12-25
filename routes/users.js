import express from "express";
import { buyTickets, createUser } from "../controllers/users.js";

const router = express.Router();


router.route("/register").post(createUser)
router.route("/tickets/buy").post(buyTickets)


export default router;