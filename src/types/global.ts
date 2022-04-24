export interface Classroom {
  id: string
  name: string
  students: Student[]
}

export interface Student {
  firstName: string
  lastName: string
}

// Action types
export const GET_CLASSROOMS = "GET_CLASSROOMS"
export const ADD_CLASSROOM = "ADD_CLASSROOM"
export const DELETE_CLASSROOM = "DELETE_CLASSROOM"
export const UPDATE_CLASSROOM = "UPDATE_CLASSROOM"
