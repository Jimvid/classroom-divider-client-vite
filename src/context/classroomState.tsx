import React from "react"
import { ClassroomContext } from "./classroomContext"
import classroomReducer from "./classroomReducer"
import * as T from "../types/global"

const ClassroomState = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(classroomReducer, {
    groups: [],
    disabledStudentIds: [],
  })

  const disableStudent = (id: string) => {
    dispatch({ type: T.DISABLE_STUDENT, payload: id })
  }

  const enableStudent = (id: string) => {
    dispatch({ type: T.ENABLE_STUDENT, payload: id })
  }

  const groupUpStudents = (groups: T.IStudentGroup[], id: number) => {
    dispatch({ type: T.SET_GROUPS, payload: { groups, id } })
  }

  const resetGroup = (classroomId: T.IStudentGroup) => {
    dispatch({ type: T.RESET_GROUPS, payload: classroomId })
  }

  return (
    <ClassroomContext.Provider
      value={{
        ...state,
        disableStudent,
        enableStudent,
        groupUpStudents,
        resetGroup,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}

export default ClassroomState
