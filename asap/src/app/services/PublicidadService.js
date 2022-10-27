import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/publicidad";

export const createPublicidad = createAsyncThunk(
  "publicidad/createPublicidad",
  async (publicidad) => {
    return (await httpClient.post(`${prefix}`, publicidad)).data;
  }
);

export const updatePublicidad = createAsyncThunk(
  "publicidad/updatePublicidad",
  async (publicidad) => {
    return (await httpClient.put(`${prefix}/${publicidad.id}`, publicidad))
      .data;
  }
);

export const deletePublicidad = createAsyncThunk(
  "publicidad/deletePublicidad",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyPublicidad = createAsyncThunk(
  "publicidad/deleteManyPublicidad",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllPublicidad = createAsyncThunk(
  "publicidad/getAllPublicidad",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getPublicidadById = createAsyncThunk(
  "publicidad/getPublicidadById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
