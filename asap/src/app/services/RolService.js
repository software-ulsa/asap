import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/roles";

export const createRol = createAsyncThunk("roles/createRol", async (rol) => {
  return (await httpClient.post(`${prefix}`, rol)).data;
});

export const updateRol = createAsyncThunk("roles/updateRol", async (rol) => {
  return (await httpClient.put(`${prefix}/${rol.id}`, rol)).data;
});

export const deleteRol = createAsyncThunk("roles/deleteRol", async (id) => {
  return (await httpClient.delete(`${prefix}/${id}`)).data;
});

export const deleteManyRol = createAsyncThunk(
  "roles/deleteManyRol",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const getAllRoles = createAsyncThunk("roles/getAllRoles", async () => {
  return (await httpClient.get(`${prefix}/`)).data;
});

export const getRolById = createAsyncThunk("roles/getRolById", async (id) => {
  return (await httpClient.get(`${prefix}/${id}`)).data;
});
