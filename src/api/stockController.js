import axios from "axios";

const API_URL = "http://localhost:8080/api/stocks";

export const getAllStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the stocks!", error);
    throw error;
  }
};

export const getStockById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `There was an error fetching the stock with id ${id}!`,
      error
    );
    throw error;
  }
};

export const createStock = async (stock) => {
  try {
    const response = await axios.post(API_URL, stock);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the stock!", error);
    throw error;
  }
};

export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error(
      `There was an error updating the stock with id ${id}!`,
      error
    );
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `There was an error deleting the stock with id ${id}!`,
      error
    );
    throw error;
  }
};
