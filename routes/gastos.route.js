import { Router } from "express"
import { createGasto, getAllGastos, removeGasto, updateGasto } from "../controllers/gastos.controller.js";

const router = Router()

router.get('/', getAllGastos);
router.post('/', createGasto);
router.delete('/', removeGasto);
router.put('/', updateGasto)

export default router