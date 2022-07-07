import { baseURL, tokenOptions } from "@/config"
import { IClassroom, IGetToken } from "@/types/global"

export const createClassroom = async (
  classroom: IClassroom,
  getAccessTokenSilently: IGetToken
) => {
  const accessToken = await getAccessTokenSilently(tokenOptions)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(classroom),
  }

  try {
    const res = await fetch(`${baseURL}/classrooms`, options)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
