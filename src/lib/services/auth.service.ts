import api from "@/appwrite/appwrite";

export const getSession = async () => {
  return await api.getAccount();
};

export const logout = async () => {
  return await api.deleteCurrentSession();
};
