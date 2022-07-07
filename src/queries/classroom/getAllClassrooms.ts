import { baseURL, tokenOptions } from "@/config"
import { IGetToken } from "@/types/global"

export const getAllClassrooms = async (getAccessTokenSilently: IGetToken) => {
  const accessToken = await getAccessTokenSilently(tokenOptions)

  const fetchOptions = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }

  return await (await fetch(`${baseURL}/classrooms`, fetchOptions)).json()
}
