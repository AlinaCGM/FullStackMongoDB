import { Router } from "express";
import passport from "passport";

import {
  createUserController,
  updateUserController,
  getUserByIdController,
  logInWithPasswordController,
} from "../controllers/users";

const router = Router();

router.post("/", createUserController);
router.post("/login", logInWithPasswordController);
router.get("/:userId", getUserByIdController);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);

export default router;
