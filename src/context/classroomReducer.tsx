import Classroom from "@/pages/Classroom"
import * as T from "../types/global"

export default (state: any, action: { payload: any; type: string }) => {
  switch (action.type) {
    case T.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
        loading: false,
      }
    case T.ADD_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, action.payload],
        loading: false,
      }
    case T.DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: state.classrooms.filter((classroom: T.IClassroom) => {
          return classroom.id !== action.payload.id
        }),
        loading: false,
      }
    case T.ADD_STUDENT:
      return {
        ...state,
        classrooms: state.classrooms.map((classroom: T.IClassroom) => {
          return classroom.id === action.payload.id ? action.payload : classroom
        }),
        loading: false,
      }
    case T.DELETE_STUDENT:
      return {
        ...state,
        classrooms: state.classrooms.map((classroom: T.IClassroom) => {
          return classroom.id === action.payload.id ? action.payload : classroom
        }),
        loading: false,
      }
    default:
      return state
  }
}
