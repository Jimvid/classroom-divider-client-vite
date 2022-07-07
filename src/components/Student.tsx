import React from "react"
import { ClassroomContext } from "@/context/classroomContext"
import { IStudent } from "@/types/global"
import Icon from "./Icon"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQueryClient } from "react-query"
import { deleteStudent } from "@/queries/student/deleteStudent"
import { useParams } from "react-router-dom"

const Student = ({ student, editMode }: StudentProps) => {
  const classroomContext = React.useContext(ClassroomContext)
  const { disableStudent, enableStudent } = classroomContext as any

  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const params = useParams()
  const classroomId = params.id || ""

  const mutation = useMutation(
    (student: IStudent) => {
      return deleteStudent(student, getAccessTokenSilently)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classrooms")
        queryClient.invalidateQueries(classroomId)
      },
    }
  )

  return (
    <li
      className={`${
        student.disabled ? "disabled" : ""
      } p-2 bg-dark text-white flex-1 rounded-md text-center font-normal text-lg`}
      key={student.id}
    >
      <p>
        <span className="mr-0.25">{student.firstName}</span>
        <span>{student.lastName}</span>
      </p>
      {editMode && (
        <>
          <button onClick={() => mutation.mutate(student)}>
            <Icon className="bg-dark" icon="trashcan" />
          </button>
          {student.disabled ? (
            <button onClick={() => enableStudent(student)}>
              <Icon className="bg-dark" icon="disable" />
            </button>
          ) : (
            <button onClick={() => disableStudent(student)}>
              <Icon className="bg-dark" icon="disable" />
            </button>
          )}
        </>
      )}
    </li>
  )
}

interface StudentProps {
  student: IStudent
  editMode: boolean
}

export default Student
