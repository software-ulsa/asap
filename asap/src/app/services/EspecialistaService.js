import httpClient from "./HttpClient";

const prefix = "/especialistas";

export default class EspecialistaService {
  static async createEspecialista(especialista) {
    return (await httpClient.post(`${prefix}`, especialista)).data;
  }

  static async updateEspecialista(especialista) {
    return (await httpClient.put(`${prefix}/${especialista.id}`, especialista))
      .data;
  }

  static async deleteEspecialista(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async deleteManyEspecialista(ids) {
    return (await httpClient.post(`${prefix}/batch`, { ids: ids })).data;
  }

  static async getAllEspecialista() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getEspecialistaById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }

  static async getEspecialistaByEspecialidad(especialidad) {
    return (await httpClient.get(`${prefix}/getByEspecialidad/${especialidad}`))
      .data;
  }

  static async getEspecialistaByArea(area) {
    return (await httpClient.get(`${prefix}/getByArea/${area}`)).data;
  }
}
