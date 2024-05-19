import { Router } from "express"
import { createRandomRoommate, getAllRommates } from "../controllers/rommates.controller.js";

const router = Router()

router.get('/', getAllRommates)

router.post('/', createRandomRoommate);

export default router