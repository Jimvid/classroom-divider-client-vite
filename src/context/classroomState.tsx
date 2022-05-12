import React, { useReducer } from "react"
import { ClassroomContext } from "./classroomContext"
import classroomReducer from "./classroomReducer"

import * as T from "../types/global"
import { useAuth0 } from "@auth0/auth0-react"

const ClassroomState = ({ children }: any) => {
  const { getAccessTokenSilently } = useAuth0()
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`
  const tokenOptions = {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: import.meta.env.VITE_AUTH0_SCOPE,
  }

  const initialState = {
    classrooms: null,
    loading: false,
  }

  const [state, dispatch] = useReducer(classroomReducer, initialState)

  // Get classrooms
  const getClassrooms = async () => {
    const accessToken = await getAccessTokenSilently(tokenOptions)
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }

    try {
      const res = await fetch(`${baseURL}/classrooms`, options)
      const classrooms = await res.json()

      dispatch({ type: T.GET_CLASSROOMS, payload: classrooms })
    } catch (error: any) {
      console.log(error)
    }
  }

  // Add classroom
  const addClassroom = async (classroom: T.IClassroom) => {
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
      const data = await res.json()

      dispatch({ type: T.ADD_CLASSROOM, payload: data })
    } catch (err) {
      console.log(err)
    }
  }

  // Delete classroom
  const deleteClassroom = async (classroom: T.IClassroom) => {
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
      const data = await res.json()

      dispatch({ type: T.DELETE_CLASSROOM, payload: data })
    } catch (err) {
      console.log(err)
    }
  }

  // Add student to classroom
  const addStudent = async (student: T.IStudent) => {
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
      const data = await res.json()

      let classroom = state.classrooms.find(
        (classroom: T.IClassroom) => classroom?.id === data.classroomId
      )

      classroom = {
        ...classroom,
        students: [...classroom.students, data],
      }

      dispatch({ type: T.ADD_STUDENT, payload: classroom })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteStudent = async (student: T.IStudent) => {
    const accessToken = await getAccessTokenSilently(tokenOptions)

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(student),
    }

    try {
      const res = await fetch(`${baseURL}/students/${student.id}`, options)
      const data = await res.json()

      let classroom = state.classrooms.find(
        (classroom: T.IClassroom) => classroom?.id === data.classroomId
      )

      classroom = {
        ...classroom,
        students: [
          ...classroom.students.filter((f: T.IStudent) => f.id !== data.id),
        ],
      }

      dispatch({ type: T.DELETE_STUDENT, payload: classroom })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ClassroomContext.Provider
      value={{
        classrooms: state.classrooms,
        getClassrooms,
        addClassroom,
        deleteClassroom,
        addStudent,
        deleteStudent,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}

export default ClassroomState
