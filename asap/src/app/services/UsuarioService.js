import httpClient from "./HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/users";

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return (await httpClient.post(`${prefix}`, user)).data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  return (await httpClient.put(`${prefix}/${user.id}`, user)).data;
});

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (user) => {
    return (await httpClient.put(`${prefix}/${user.id}`, user)).data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return (await httpClient.delete(`${prefix}/${id}`)).data;
});

export const deleteManyUser = createAsyncThunk(
  "users/deleteManyUser",
  async (ids) => {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }
);

export const login = createAsyncThunk("users/login", async (user) => {
  return (await httpClient.post(`${prefix}/login`, user)).data;
});

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  return (await httpClient.get(`${prefix}/`)).data;
});

export const getById = createAsyncThunk("users/getById", async (id) => {
  return (await httpClient.get(`${prefix}/getById/${id}`)).data;
});

export const getCurrentUserById = createAsyncThunk(
  "users/getCurrentUserById",
  async (id) => {
    return (await httpClient.get(`${prefix}/getById/${id}`)).data;
  }
);

export const getByRol = createAsyncThunk("users/getByRol", async (rol) => {
  return (await httpClient.get(`${prefix}/getByRol/${rol}`)).data;
});
