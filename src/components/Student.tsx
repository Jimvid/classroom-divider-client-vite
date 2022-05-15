import React from "react"
import { ClassroomContext } from "@/context/classroomContext"
import { IStudent } from "@/types/global"
import Icon from "./Icon"

const Student = ({ student, editMode }: StudentProps) => {
  const classroomContext = React.useContext(ClassroomContext)
  const { deleteStudent, disableStudent, enableStudent } =
    classroomContext as any
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
          <button onClick={() => deleteStudent(student)}>
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
