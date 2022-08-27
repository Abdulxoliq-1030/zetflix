import http from "./http";

export function login(data) {
  return http.post("/auth", data);
}

export function register(data) {
  return http.post("/users", data);
}
