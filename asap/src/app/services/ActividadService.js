import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/actividades";

export const createActividad = createAsyncThunk(
  "actividades/createActividad",
  async (actividad) => {
    return (await httpClient.post(`${prefix}`, actividad)).data;
  }
);

export const updateActividad = createAsyncThunk(
  "actividades/updateActividad",
  async (actividad) => {
    return (await httpClient.put(`${prefix}/${actividad.id}`, actividad)).data;
  }
);

export const deleteActividad = createAsyncThunk(
  "actividades/deleteActividad",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyActividad = createAsyncThunk(
  "actividades/deleteManyActividad",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllActividad = createAsyncThunk(
  "actividades/getAllActividad",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getAllActividadByCursoId = createAsyncThunk(
  "actividades/getAllActividadByCursoId",
  async (id) => {
    return (await httpClient.get(`${prefix}/curso/${id}`)).data;
  }
);

export const getActividadById = createAsyncThunk(
  "actividades/getActividadById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
