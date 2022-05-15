export interface IClassroom {
  id?: number
  name: string
  students?: IStudent[]
  groups?: IStudent[][]
}

export interface IStudent {
  id?: string
  classroomId?: number
  disabled?: boolean
  firstName: string
  lastName: string
}

export interface IClassroomContext {
  classrooms: IClassroom[]
  getClassrooms: () => IClassroom[]
  addClassroom: () => void
  deleteClassroom: () => void
}

// Action types
export const GET_CLASSROOMS = "GET_CLASSROOMS"
export const ADD_CLASSROOM = "ADD_CLASSROOM"
export const DELETE_CLASSROOM = "DELETE_CLASSROOM"
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM"
export const ADD_STUDENT = "ADD_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
export const SET_GROUPS = "SET_STUDENT_GROUPS"
export const RESET_GROUPS = "RESET_GROUPS"
export const DISABLE_STUDENT = "DISABLE_STUDENT"
export const ENABLE_STUDENT = "ENABLE_STUDENT"
