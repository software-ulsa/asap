import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/notas";

export const createNota = createAsyncThunk("notas/createNota", async (nota) => {
  return (await httpClient.post(`${prefix}`, nota)).data;
});

export const updateNota = createAsyncThunk("notas/updateNota", async (nota) => {
  return (await httpClient.put(`${prefix}/${nota.id}`, nota)).data;
});

export const acceptNota = createAsyncThunk("notas/acceptNota", async (nota) => {
  return (await httpClient.put(`${prefix}/aceptar/${nota.id}`, nota)).data;
});

export const rejectNota = createAsyncThunk("notas/rejectNota", async (nota) => {
  return (await httpClient.put(`${prefix}/rechazar/${nota.id}`, nota)).data;
});

export const deleteNota = createAsyncThunk("notas/deleteNota", async (id) => {
  return (await httpClient.delete(`${prefix}/${id}`)).data;
});

export const deleteManyNota = createAsyncThunk(
  "notas/deleteManyNota",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllNotas = createAsyncThunk("notas/getAllNotas", async () => {
  return (await httpClient.get(`${prefix}/`)).data;
});

export const getNotaById = createAsyncThunk("notas/getNotaById", async (id) => {
  return (await httpClient.get(`${prefix}/${id}`)).data;
});

export const getNotaByKeyword = createAsyncThunk(
  "notas/getNotaByKeyword",
  async (palabras_clave) => {
    return (await httpClient.get(`${prefix}/getByKeyword/${palabras_clave}`))
      .data;
  }
);
