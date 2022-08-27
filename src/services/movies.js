import http from "./http";

const point = "/movies";

export function getMovies() {
  return http.get("/movies"); //
}

export function createMovie(body) {
  return http.post(point, body);
}

export function getMovie(movieID) {
  return http.get(`${point}/${movieID}`);
}

export function deleteMovie(movieID) {
  return http.delete(`${point}/${movieID}`);
}

export function updateMovie(movieID, data) {
  return http.put(`${point}/${movieID}`, data);
}
