import { StatusCode } from "../../errors/StatusCode.js";
import {
  createLocation,
  destoryLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "./location.service.js";

export const craeteLoactionController = async (req, res) => {
  try {
    const location = await createLocation(req.body);
    res.status(StatusCode.SUCCESS).json({ data: location });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getLocationsController = async (req, res) => {
  try {
    const locations = await getLocations();
    res.status(StatusCode.SUCCESS).json({ data: locations });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getLocationByIdController = async (req, res) => {
  try {
    const location = await getLocationById(req.params.id);

    res.status(StatusCode.SUCCESS).json({ data: location });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateLocationController = async (req, res) => {
  try {
    const location = await updateLocation(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: location });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destoryLocationController = async (req, res) => {
  try {
    await destoryLocation(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
