import { API } from "./config";
import axios from "axios";

class GradeService {
  getGrades() {
    return axios.get(`${API}/grades`);
  }
  getGrade(id) {
    return axios.get(`${API}/grades/${id}`);
  }
  addGrade(grade) {
    console.log("add grade", grade);
    return axios.post(`${API}/grades`, { ...grade });
  }
  updateGrade(id, grade) {
    return axios.put(`${API}/grades/${id}`, { ...grade });
  }
  filter(search) {
    return axios.get(`${API}/grades/search/${search}`);
  }

  deleteGrade(id) {
    return axios.delete(`${API}/grades/${id}`);
  }
}

const gradeService = new GradeService();
export default gradeService;
