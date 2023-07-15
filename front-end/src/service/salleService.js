import { API } from "./config";
import axios from "axios";

class SalleService {
  getSalles() {
    return axios.get(`${API}/salles`);
  }
  getSalle(id) {
    return axios.get(`${API}/salles/${id}`);
  }
  addSalle(salle) {
    return axios.post(`${API}/salles`, { ...salle });
  }
  updateSalle(id, salle) {
    return axios.put(`${API}/salles/${id}`, { ...salle });
  }
  filter(search) {
    return axios.get(`${API}/salles/search/${search}`);
  }

  deleteSalle(id) {
    return axios.delete(`${API}/salles/${id}`);
  }
}

const salleService = new SalleService();
export default salleService;
