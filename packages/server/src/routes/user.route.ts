import { Router } from "express";
import { userController } from "@modules/user/user.controller";
import multer from "multer";

const userRoutes = Router();

const upload = multer({ dest: "tmp/uploads/" });

userRoutes.get("/users", userController.getAllUsers);
userRoutes.post("/user", userController.createUser);
userRoutes.get("/user/:id", userController.getUser);
userRoutes.patch("/user/:id", userController.update);
userRoutes.patch("/user/:id/avatar", upload.single("avatar"), userController.updateAvatar);

export { userRoutes };
