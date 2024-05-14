import axios from "axios";

const API_URL = "http://localhost:8080/api/items";

export const getAllItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the items!", error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the item with id ${id}!`, error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the item!", error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(`There was an error updating the item with id ${id}!`, error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error deleting the item with id ${id}!`, error);
    throw error;
  }
};
