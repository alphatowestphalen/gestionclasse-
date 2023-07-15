import { API } from "./config";
import axios from "axios";

class OccupationService {
  getOccs() {
    return axios.get(`${API}/occupes`);
  }
  getOcc(id) {
    return axios.get(`${API}/occupes/${id}`);
  }
  addOcc(occupe) {
    return axios.post(`${API}/occupes`, { ...occupe });
  }
  updateOcc(id, occupe) {
    return axios.put(`${API}/occupes/${id}`, { ...occupe });
  }
  filter(search) {
    return axios.get(`${API}/occupes/search/${search}`);
  }

  deleteOcc(id) {
    return axios.delete(`${API}/occupes/${id}`);
  }
}

const occupService = new OccupationService();
export default occupService;
