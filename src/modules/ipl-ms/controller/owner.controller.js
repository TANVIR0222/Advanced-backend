import ApiResponse from "../../../common/utils/api-response";
import * as ownerService from "../services/owner.services.js";

const createOwner = async (req, res) => {
  const owner = await ownerService.createOwner(req.body);

  ApiResponse.create(res, 201, "Owner create successful", owner);
};
const getAllOwner = async (req, res) => {
  const owner = await ownerService.getAllOwner();

  ApiResponse.create(res, 201, "all owner data", owner);
};
const getOwnerById = async (req, res) => {
  const owner = await ownerService.getOwnerById(req.params.id);

  ApiResponse.create(res, 201, "all owner data", owner);
};
const updateOwner = async (req, res) => {
  const owner = await ownerService.updateOwner(req.params.id, req.body);

  ApiResponse.create(res, 201, " owner updated success full", owner);
};
const deleteOwner = async (req, res) => {
  const owner = await ownerService.deleteOwner(req.params.id);

  ApiResponse.create(res, 201, "owner deleted success full", owner);
};

export { createOwner, deleteOwner, getAllOwner, getOwnerById, updateOwner };
