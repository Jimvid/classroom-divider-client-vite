import Classroom from "@/pages/Classroom"
import * as T from "../types/global"

export default (state: any, action: { payload: any; type: string }) => {
  switch (action.type) {
    case T.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
      }
    case T.ADD_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload],
      }
    case T.DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: state.classrooms.filter((classroom: T.IClassroom) => {
          return classroom.id !== action.payload.id
        }),
      }
    case T.ADD_STUDENT:
      return {
        ...state,
        classrooms: state.classrooms.map((classroom: T.IClassroom) => {
          return classroom.id === action.payload.id ? action.payload : classroom
        }),
      }
    case T.DELETE_STUDENT:
      return {
        ...state,
        classrooms: state.classrooms.map((classroom: T.IClassroom) => {
          return classroom.id === action.payload.id ? action.payload : classroom
        }),
      }
    case T.DISABLE_STUDENT:
      const disabled = [...state.classrooms].map((classroom: T.IClassroom) => {
        if (!classroom.students) return classroom

        const students = [...classroom.students].map((student: T.IStudent) => {
          return student.id === action.payload.student.id
            ? { ...student, disabled: true }
            : { ...student, disabled: student.disabled || false }
        })

        return { ...classroom, students }
      })

      return {
        ...state,
        classrooms: disabled,
      }
    case T.ENABLE_STUDENT:
      const enabled = [...state.classrooms].map((classroom: T.IClassroom) => {
        if (!classroom.students) return classroom

        const students = [...classroom.students].map((student: T.IStudent) => {
          return student.id === action.payload.student.id
            ? { ...student, disabled: false }
            : { ...student, disabled: student.disabled || false }
        })

        return { ...classroom, students }
      })

      return {
        ...state,
        classrooms: enabled,
      }
    case T.SET_GROUPS:
      return {
        ...state,
        classrooms: [
          ...state.classrooms.map((classroom: T.IClassroom) => {
            if (classroom.id == action.payload.id) {
              return { ...classroom, groups: [...action.payload.groups] }
            } else {
              return classroom
            }
          }),
        ],
      }
    case T.RESET_GROUPS:
      return {
        ...state,
        classrooms: [
          ...state.classrooms.map((classroom: T.IClassroom) => {
            return { ...classroom, groups: [] }
          }),
        ],
      }
    default:
      return state
  }
}
