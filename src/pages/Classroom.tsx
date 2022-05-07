import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IClassroomContext, IStudent } from "@/types/global"
import Student from "../components/Student"
import StudentForm from "../components/StudentForm"
import Button from "@/components/Button"
import Divider from "@/components/Divider"
const Classroom = (p: IClassroom) => {
  const classroomContext = React.useContext(ClassroomContext)
  const { classrooms, getClassrooms } = classroomContext as any
  const params = useParams()
  const [editClassroom, setEditClassroom] = React.useState(false)
  const [currentClassroom, setCurrentClassroom] =
    React.useState<IClassroom | null>(null)
  const toggleClassroomEdit = () => setEditClassroom((state) => !state)
  const [numberOfGroups, setNumberOfGrouos] = React.useState(3)

  React.useEffect(() => {
    if (!classrooms) {
      getClassrooms()
    } else {
      // This needs to be handled in a better way
      setCurrentClassroom(classrooms.find((f: any) => f.name === params.name))
    }
  }, [classrooms])

  const resetFiltering = () => {}

  const groupUpStudents = () => {}

  if (!currentClassroom) return null
  return (
    <section>
      <section>
        <h1 className="text-3xl mb-2">Classroom {currentClassroom.name}</h1>
        <div className="flex justify-between mb-1">
          <input
            className="md:max-w-half border placeholder-grey border-light-grey rounded-md pl-1 pr-1 flex-1"
            placeholder="Search for student"
          />
          <Button onClick={toggleClassroomEdit}>Edit</Button>
        </div>
      </section>
      <section className="mb-2">
        {currentClassroom.students && (
          <>
            <label htmlFor="quantity">
              Divide all {currentClassroom.students.length} students into groups
              of
            </label>
            <input
              id="quantity"
              name="numberOfGroups"
              style={{
                maxWidth: "68px",
              }}
              type="number"
              className="md:max-w-half border placeholder-grey border-light-grey rounded-md ml-0.5 pl-0.75 pr-0.25"
              min="2"
              max="99"
            />
          </>
        )}
        <div className="flex gap-1">
          <Button>Group up</Button>
          <Button>Reset</Button>
        </div>
      </section>
      <Divider />
      {editClassroom && (
        <>
          <StudentForm classroom={currentClassroom} />
          <Divider />
        </>
      )}
      {currentClassroom?.students && (
        <section>
          <ul className="grid gap-1 grid-cols-3">
            {currentClassroom.students.map((student: IStudent) => (
              <Student
                key={student.id}
                student={student}
                editMode={editClassroom}
              />
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}

export default Classroom

Classroom.defaultProps = {
  id: "",
  name: "",
  students: [],
}
