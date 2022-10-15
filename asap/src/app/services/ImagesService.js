import { httpFormDataClient } from "./HttpClient";

const prefix = "/imagenes";

export default class ImagenesService {
  static async upload(file) {
    let data = new FormData();
    data.append("foto", file);
    return (await httpFormDataClient.post(prefix, data)).data;
  }

  static async get(key) {
    return (await httpFormDataClient.get(prefix + "/" + key)).data;
  }

  static async delete(key) {
    return (await httpFormDataClient.delete(prefix + "/" + key)).data;
  }
}
