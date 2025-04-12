import express from "express";
import { getUserAnalytics } from "../controllers/DataVisController.js";

const router = express.Router();
router.get("/analytics", getUserAnalytics);

export default router;
