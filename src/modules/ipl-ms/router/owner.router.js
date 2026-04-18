import { Router } from "express";
import * as controller from "../controller/owner.controller.js";

const ownerRouter = Router();

// create a new owner
ownerRouter.post("/", controller.createOwner);

//Get all owner
ownerRouter.get("/", controller.getAllOwner);

// get all owner by id
ownerRouter.get("/:id", controller.getOwnerById);

//update owner
ownerRouter.put("/:id", controller.updateOwner);

//delete owner
ownerRouter.delete("/:id", controller.deleteOwner);

export default ownerRouter;
