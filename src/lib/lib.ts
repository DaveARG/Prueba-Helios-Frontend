export const GLOB = {
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : "url de producción",
}
