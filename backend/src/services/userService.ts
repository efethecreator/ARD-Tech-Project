import User from "../models/user.model";

export const getAllUsers = async () => {
  return await User.find();
};

export const getAdmins = async () => {
  return await User.find({ userRole: "admin" });
};

export const updateUser = async (id: string, updateData: Partial<Record<string, unknown>>) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedUser) throw new Error("User not found");
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");
  return deletedUser;
};
