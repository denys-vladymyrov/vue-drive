import http from "./http";
export const recentFiles = () =>
  http.get("/files?_sort=createdAt&_order=desc")