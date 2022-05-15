import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IStudent } from "@/types/global"
import React from "react"

const StudentForm = ({ classroom }: StudentForm) => {
  const classroomContext = React.useContext(ClassroomContext)
  const { addStudent } = classroomContext as any

  const [student, setStudent] = React.useState<IStudent>({
    firstName: "",
    lastName: "",
    classroomId: classroom.id,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (student.firstName.length >= 2 && student.lastName.length >= 2) {
      addStudent(student)

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
