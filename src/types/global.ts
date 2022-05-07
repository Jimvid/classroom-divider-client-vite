export interface IClassroom {
  id?: number
  name: string
  students?: IStudent[]
}

export interface IStudent {
  id?: string
  classroomId?: number
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
