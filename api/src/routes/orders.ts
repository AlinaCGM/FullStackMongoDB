import { Router } from "express";
import {
  getAllOrderByUserId,
  createOrderController,
} from "../controllers/orders";
import passport from "passport";

const router = Router();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getAllOrderByUserId
);
router.post(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  createOrderController
);

export default router;
