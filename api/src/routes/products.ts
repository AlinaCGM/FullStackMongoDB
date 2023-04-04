import { Router } from "express";
import passport from "passport";

import {
  getAllProductsController,
  createProductController,
  getProductDetailsController,
} from "../controllers/products";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:productId", getProductDetailsController);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createProductController
);

export default router;
