const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env

export const config = {
  server: { host: VITE_SERVER_HOST, port: VITE_SERVER_PORT },
}
