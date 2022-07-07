export const getSingleClassroom = async (
  path: string,
  getAccessTokenSilently: any
) => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`

  const accessToken = await getAccessTokenSilently({
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: import.meta.env.VITE_AUTH0_SCOPE,
  })

  const fetchOptions = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }

  return await (
    await fetch(`${baseURL}/classrooms/${path}`, fetchOptions)
  ).json()
}
