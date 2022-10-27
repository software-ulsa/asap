import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/cursos";

export const createCurso = createAsyncThunk(
  "cursos/createCurso",
  async (curso) => {
    return (await httpClient.post(`${prefix}`, curso)).data;
  }
);

export const updateCurso = createAsyncThunk(
  "cursos/updateCurso",
  async (curso) => {
    return (await httpClient.put(`${prefix}/${curso.id}`, curso)).data;
  }
);

export const deleteCurso = createAsyncThunk(
  "cursos/deleteCurso",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyCurso = createAsyncThunk(
  "cursos/deleteManyCurso",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllCurso = createAsyncThunk("cursos/getAllCurso", async () => {
  return (await httpClient.get(`${prefix}/`)).data;
});

export const getCursoById = createAsyncThunk(
  "cursos/getCursoById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);
