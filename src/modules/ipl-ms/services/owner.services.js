import ApiError from "../../../common/utils/api-error";
import Owner from "../model/owner.model.js";

const createOwner = async ({ name, company }) => {
  const owner = await Owner.create({ name, company });
  return owner;
};

const getAllOwner = async ({}) => {
  const allOwner = await Owner.find();

  return allOwner;
};

const getOwnerById = async ({ id }) => {
  const singleOwner = await Owner.findById({ _id: id });

  if (!singleOwner) {
    throw ApiError.notFound("Owner not found");
  }

  return singleOwner;
};

const updateOwner = async (id, { name, company }) => {
  const owner = await Owner.findByIdAndUpdate(
    id,
    {
      name,
      company,
    },
    { new: true, runValidators }
  );

  return owner;
};

const deleteOwner = async (id) => {
  const owner = await Owner.findByIdAndDelete(id);

  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }

  return owner;
};

export { createOwner, deleteOwner, getAllOwner, getOwnerById, updateOwner };
