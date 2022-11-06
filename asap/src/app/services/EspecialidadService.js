import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/especialidades";

export const createEspecialidad = createAsyncThunk(
  "especialidades/createEspecialidad",
  async (especialidad) => {
    return (await httpClient.post(`${prefix}`, especialidad)).data;
  }
);

export const updateEspecialidad = createAsyncThunk(
  "especialidades/updateEspecialidad",
  async (especialidad) => {
    return (await httpClient.put(`${prefix}/${especialidad.id}`, especialidad))
      .data;
  }
);

export const deleteEspecialidad = createAsyncThunk(
  "especialidades/deleteEspecialidad",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyEspecialidad = createAsyncThunk(
  "especialidades/deleteManyEspecialidad",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllEspecialidades = createAsyncThunk(
  "especialidades/getAllEspecialidades",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getEspecialidadById = createAsyncThunk(
  "especialidades/getEspecialidadById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
