import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/categorias";

export const createCategoria = createAsyncThunk(
  "categorias/createCategoria",
  async (categoria) => {
    return (await httpClient.post(`${prefix}`, categoria)).data;
  }
);

export const updateCategoria = createAsyncThunk(
  "categorias/updateCategoria",
  async (categoria) => {
    return (await httpClient.put(`${prefix}/${categoria.id}`, categoria)).data;
  }
);

export const deleteCategoria = createAsyncThunk(
  "categorias/deleteCategoria",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyCategoria = createAsyncThunk(
  "categorias/deleteManyCategoria",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllCategorias = createAsyncThunk(
  "categorias/getAllCategorias",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getCategoriaById = createAsyncThunk(
  "categorias/getCategoriaById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
