import { baseURL, tokenOptions } from "@/config"
import { IGetToken, IStudent } from "@/types/global"

export const createStudent = async (
  student: IStudent,
  getAccessTokenSilently: IGetToken
) => {
  const accessToken = await getAccessTokenSilently(tokenOptions)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(student),
  }

  try {
    const res = await fetch(`${baseURL}/students`, options)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
