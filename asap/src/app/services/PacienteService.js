import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/pacientes";

export const createPaciente = createAsyncThunk(
  "paciente/createPaciente",
  async (paciente) => {
    return (await httpClient.post(`${prefix}`, paciente)).data;
  }
);

export const updatePaciente = createAsyncThunk(
  "paciente/updatePaciente",
  async (paciente) => {
    return (await httpClient.put(`${prefix}/${paciente.id}`, paciente)).data;
  }
);

export const deletePaciente = createAsyncThunk(
  "paciente/deletePaciente",
  async (id) => {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }
);

export const deleteManyPaciente = createAsyncThunk(
  "paciente/deleteManyPaciente",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllPaciente = createAsyncThunk(
  "paciente/getAllPaciente",
  async () => {
    return (await httpClient.get(`${prefix}/`)).data;
  }
);

export const getPacienteById = createAsyncThunk(
  "paciente/getPacienteById",
  async (id) => {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
);

export const getPacienteByCarrera = createAsyncThunk(
  "paciente/getByCarrera",
  async (carrera) => {
    return (await httpClient.get(`${prefix}/getByCarrera/${carrera}`)).data;
  }
);
