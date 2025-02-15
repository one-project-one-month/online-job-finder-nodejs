import express from "express";
import {
  craeteLoactionController,
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
locationRouter.get("/", getLocationsController);
locationRouter.get("/:id", getLocationByIdController);
locationRouter.put("/:id", updateLocationController);

export default locationRouter;
