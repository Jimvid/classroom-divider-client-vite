import React from "react"
import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IStudent } from "@/types/global"
import { createStudent } from "@/queries/student/createStudent"
import { useMutation, useQueryClient } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { useParams } from "react-router-dom"

const StudentForm = ({ classroom }: StudentForm) => {
  const params = useParams()
  const classroomId = params.id || ""
  const { getAccessTokenSilently } = useAuth0()
  const [student, setStudent] = React.useState<IStudent>({
    firstName: "",
    lastName: "",
    classroomId: classroom.id,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (student: IStudent) => {
      return createStudent(student, getAccessTokenSilently)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classrooms")
        queryClient.invalidateQueries(classroomId)
      },
    }
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (student.firstName.length >= 2 && student.lastName.length >= 2) {
      mutation.mutate(student)

      setStudent({
        firstName: "",
        lastName: "",
        classroomId: classroom.id,
      })
    }
  }

  return (
    <form
      className="flex justify-between flex-col mb-2 gap-1"
      onSubmit={onSubmit}
    >
      <div className="flex flex-1 gap-1">
        <input
          className="flex-1 border placeholder-grey border-light-grey rounded-md p-0.5 pl-1.5 pr-1.5"
          onChange={onChange}
          placeholder="Förnamn"
          name="firstName"
          value={student.firstName}
        />
        <input
          className="flex-1 border placeholder-grey border-light-grey rounded-md pl-1 pr-1"
          onChange={onChange}
          placeholder="Efternamn"
          name="lastName"
          value={student.lastName}
        />
      </div>
      <input
        className="rounded-md bg-dark text-white p-0.5 pl-1.5 pr-1.5 cursor-pointer"
        type="submit"
        value="Lägg till"
      />
    </form>
  )
}

interface StudentForm {
  classroom: IClassroom
}

export default StudentForm
