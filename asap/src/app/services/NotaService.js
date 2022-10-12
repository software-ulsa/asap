import httpClient from "./HttpClient";

const prefix = "/notas";

export default class NotaService {
  static async createNota(nota) {
    return (await httpClient.post(`${prefix}`, nota)).data;
  }

  static async updateNota(nota) {
    return (await httpClient.put(`${prefix}/${nota.id}`, nota)).data;
  }

  static async deleteNota(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAllNotas() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getNotaById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }

  static async getNotaByKeyword(palabras_clave) {
    return (await httpClient.get(`${prefix}/getByKeyword`)).data;
  }
}
