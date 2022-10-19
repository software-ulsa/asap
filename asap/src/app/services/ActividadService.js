import httpClient from "./HttpClient";

const prefix = "/actividades";

export default class ActividadService {
  static async createActividad(actividad) {
    return (await httpClient.post(`${prefix}`, actividad)).data;
  }

  static async updateActividad(actividad) {
    return (await httpClient.put(`${prefix}/${actividad.id}`, actividad)).data;
  }

  static async deleteActividad(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async deleteManyActividad(ids) {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }

  static async getAllActividad() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getActividadById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
