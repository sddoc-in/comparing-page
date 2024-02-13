import express from "express";
import { getPlatforms } from "../controller/get-platform.js";
import { getFeatures } from "../controller/get-features.js";
import { gpt } from "../controller/gpt.js";

const router = express.Router()

router.get("/api/get-platform", getPlatforms)
router.get("/api/get-features", getFeatures)
router.post("/api/summarize", gpt)

export default router;