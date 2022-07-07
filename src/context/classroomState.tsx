import React from "react"
import { ClassroomContext } from "./classroomContext"
import classroomReducer from "./classroomReducer"
import * as T from "../types/global"

const ClassroomState = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(classroomReducer, {
    groups: null,
    disabledStudents: [],
  })

  const disableStudent = (student: T.IStudent) => {
    dispatch({ type: T.DISABLE_STUDENT, payload: { student } })
  }

  const enableStudent = (student: T.IStudent) => {
    dispatch({ type: T.ENABLE_STUDENT, payload: { student } })
  }

  const groupUpStudents = (groups: any[], id: number) => {
    dispatch({ type: T.SET_GROUPS, payload: { groups, id } })
  }

  const resetGroups = () => {
    dispatch({ type: T.RESET_GROUPS, payload: {} })
  }

  return (
    <ClassroomContext.Provider
      value={{
        ...state,
        disableStudent,
        enableStudent,
        groupUpStudents,
        resetGroups,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}

export default ClassroomState
