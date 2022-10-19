import httpClient from "./HttpClient";

const prefix = "/publicidad";

export default class PublicidadService {
  static async createPublicidad(publicidad) {
    return (await httpClient.post(`${prefix}`, publicidad)).data;
  }

  static async updatePublicidad(publicidad) {
    return (await httpClient.put(`${prefix}/${publicidad.id}`, publicidad))
      .data;
  }

  static async deletePublicidad(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async deleteManyPublicidad(ids) {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }

  static async getAllPublicidad() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getPublicidadById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
