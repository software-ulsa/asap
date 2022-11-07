import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/especialistas";

export const createEspecialista = createAsyncThunk(
  "especialista/createEspecialista",
  async (especialista) => {
    return (await httpClient.post(`${prefix}`, especialista)).data;
  }
);

export const updateEspecialista = createAsyncThunk(
  "especialista/updateEspecialista",
  async (especialista) => {
    return (await httpClient.put(`${prefix}/${especialista.id}`, especialista))
      .data;
  }
);

export const deleteEspecialista = createAsyncThunk(
  "especialista/deleteEspecialista",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyEspecialista = createAsyncThunk(
  "especialista/deleteManyEspecialista",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllEspecialista = createAsyncThunk(
  "especialista/getAllEspecialista",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getEspecialistaById = createAsyncThunk(
  "especialista/getEspecialistaById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);

export const getEspecialistaByEspecialidad = createAsyncThunk(
  "especialista/getEspecialistaByEspecialidad",
  async (especialidad) => {
    return (await httpClient.get(`${prefix}/getByEspecialidad/${especialidad}`))
      .data;
  }
);
