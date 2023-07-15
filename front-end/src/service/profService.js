import { API } from "./config";
import axios from "axios";

class ProfService {
  getProfs() {
    return axios.get(`${API}/professeurs`);
  }
  getProf(id) {
    return axios.get(`${API}/professeurs/${id}`);
  }
  addProf(prof) {
    return axios.post(`${API}/professeurs`, { ...prof });
  }
  updateProf(id, prof) {
    return axios.put(`${API}/professeurs/${id}`, { ...prof });
  }
  filter(search) {
    return axios.get(`${API}/professeurs/search/${search}`);
  }

  deleteProf(id) {
    return axios.delete(`${API}/professeurs/${id}`);
  }
}

const profService = new ProfService();
export default profService;
