import axios from "axios";
const env = import.meta.env;

export const getUsers = async (pageNo = 1) => {
  try {
    const endPoint = env.VITE_BASE_URL + env.VITE_FETCH_USERS_URL;
    const res = await axios.get(endPoint + `?page=${pageNo}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log("Fetching Users Failed !");
    console.log(error);
  }
};

export const updateUser = async (updatedData) => {
  try {
    const endPoint =
      env.VITE_BASE_URL + env.VITE_UPDATE_USER_URL + `/${updatedData.id}`;
    const res = await axios.put(endPoint, updatedData);
    return res.data;
  } catch (error) {
    console.log("Updating Users Failed !");
    console.log(error);
  }
};

export const deleteUserById = async (id) => {
  try {
    const endPoint = env.VITE_BASE_URL + env.VITE_DELETE_USER_URL;
    await axios.delete(endPoint + `/${id}`);
  } catch (error) {
    console.log("Failed to delete user !");
    console.log(error);
  }
};
