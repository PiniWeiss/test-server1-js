import express from "express";
import { buyTickets, createUser, getUserSummary } from "../controllers/users.js";

const router = express.Router();


router.route("/register").post(createUser)
router.route("/tickets/buy").post(buyTickets)
router.route("/:username/summary").get(getUserSummary)


export default router;