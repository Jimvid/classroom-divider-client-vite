import React, { useReducer } from "react"
import { ClassroomContext } from "./classroomContext"
import classroomReducer from "./classroomReducer"

import * as T from "../types/global"
import { useAuth0 } from "@auth0/auth0-react"

const ClassroomState = ({ children }: any) => {
  const { getAccessTokenSilently } = useAuth0()
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}/classrooms`

  const initialState = {
    classrooms: null,
    loading: false,
  }

  const [state, dispatch] = useReducer(classroomReducer, initialState)

  // Get classrooms
  const getClassrooms = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: import.meta.env.VITE_AUTH0_SCOPE,
      })
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })

      const classrooms = await response.json()
      console.log(classrooms)

      dispatch({
        type: T.GET_CLASSROOMS,
        payload: classrooms,
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <ClassroomContext.Provider
      value={{
        classrooms: state.classrooms,
        getClassrooms,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}

export default ClassroomState
