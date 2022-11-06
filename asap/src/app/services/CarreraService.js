import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/carreras";

export const createCarrera = createAsyncThunk(
  "carreras/createCarrera",
  async (carrera) => {
    return (await httpClient.post(`${prefix}`, carrera)).data;
  }
);

export const updateCarrera = createAsyncThunk(
  "carreras/updateCarrera",
  async (carrera) => {
    return (await httpClient.put(`${prefix}/${carrera.id}`, carrera)).data;
  }
);

export const deleteCarrera = createAsyncThunk(
  "carreras/deleteCarrera",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyCarrera = createAsyncThunk(
  "carreras/deleteManyCarrera",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllCarreras = createAsyncThunk(
  "carreras/getAllCarreras",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getCarreraById = createAsyncThunk(
  "carreras/getCarreraById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
