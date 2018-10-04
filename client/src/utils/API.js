import axios from "axios";

export default {
  // Gets all saved history
  getSavedHistories: function () {
    return axios.get("/api/history");
  },
  // Deletes the saved history with the given id
  deleteHistory: function (id) {
    return axios.delete("/api/history/" + id);
  },
  // Saves a history to the database
  saveHistory: function (articleData) {
    return axios.post("/api/history", articleData);
  },
  // Gets all saved history
  getUser: function () {
    return axios.get("/api/user");
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/user", userData);
  }
};