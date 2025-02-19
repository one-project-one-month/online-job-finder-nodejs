import express from "express";
import {
  craeteLoactionController,
  destoryLocationController,
  getLocationByIdController,
  getLocationsController,
  updateLocationController,
} from "./location.controller.js";
import validate from "../../middleware/validate.js";
import { locationSchema } from "./location.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const locationRouter = express.Router();

locationRouter.post(
  "/",
  validate(locationSchema),
  authenticateToken,
  adminMiddleware,
  craeteLoactionController
);
locationRouter.get("/", authenticateToken, getLocationsController);
locationRouter.get("/:id", authenticateToken, getLocationByIdController);
locationRouter.put(
  "/:id",
  validate(locationSchema),
  authenticateToken,
  adminMiddleware,
  updateLocationController
);
locationRouter.delete(
  "/:id",
  authenticateToken,
  adminMiddleware,
  destoryLocationController
);

export default locationRouter;
