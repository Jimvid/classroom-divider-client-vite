import { baseURL, tokenOptions } from "@/config"
import { IClassroom, IGetToken } from "@/types/global"

export const deleteClassroom = async (
  classroom: IClassroom,
  getAccessTokenSilently: IGetToken
) => {
  const accessToken = await getAccessTokenSilently(tokenOptions)

  const options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const res = await fetch(
      `${`${baseURL}/classrooms`}/${classroom.id}`,
      options
    )
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
