import express from "express";
import { getPlatforms } from "../controller/get-platform.js";
import { getFeatures } from "../controller/get-features.js";

const router = express.Router()

router.get("/api/get-platform", getPlatforms)
router.get("/api/get-features", getFeatures)

export default router;