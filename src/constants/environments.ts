// ref: https://vitejs.dev/guide/env-and-mode.html
const ENV = import.meta.env.VITE_ENV || "development";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export { ENV, BASE_URL };
