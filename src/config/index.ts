export const baseURL = `${import.meta.env.VITE_API_BASE_URL}`

export const tokenOptions = {
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  scope: import.meta.env.VITE_AUTH0_SCOPE,
}
