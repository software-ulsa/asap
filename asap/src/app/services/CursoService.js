import httpClient from "./HttpClient";

const prefix = "/cursos";

export default class CursoService {
  static async createCurso(curso) {
    return (await httpClient.post(`${prefix}`, curso)).data;
  }

  static async updateCurso(curso) {
    return (await httpClient.put(`${prefix}/${curso.id}`, curso)).data;
  }

  static async deleteCurso(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAllCurso() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getCursoById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
