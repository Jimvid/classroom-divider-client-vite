import React from "react"
import { useParams } from "react-router-dom"
import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IStudent } from "@/types/global"
import Student from "../components/Student"
import StudentForm from "../components/StudentForm"
import Button from "@/components/Button"
import Divider from "@/components/Divider"
import { toSubarrays, shuffle } from "@/lib/helpers"
import StudentGroup from "@/components/StudentGroup"

const Classroom = () => {
  // Context
  const classroomContext = React.useContext(ClassroomContext)
  const { classrooms, groupUpStudents, resetGroups } = classroomContext as any

  // Hooks
  const params = useParams()

  // State
  const [editClassroom, setEditClassroom] = React.useState(false)
  const [classroom, setClassroom] = React.useState<IClassroom | null>(null)
  const [numberOfGroups, setNumberOfGroups] = React.useState<number>(2)
  const [displayGroups, setDisplayGroups] = React.useState(false)

  // Functions
  const toggleClassroomEdit = () => {
    setEditClassroom((state) => !state)
    setDisplayGroups(false)
    resetGroups()
    setDisplayGroups(false)
  }

  const resetFiltering = () => {
    setNumberOfGroups(2)
    setDisplayGroups(false)
    resetGroups()
    setDisplayGroups(false)
  }

  const groupUp = (students: any[]) => {
    setEditClassroom(false)

    const groupOfStudents: any[] | undefined = toSubarrays(
      shuffle([...students.filter((student) => !student?.disabled)]),
      numberOfGroups
    )

    if (groupOfStudents && classroom) {
      groupUpStudents(groupOfStudents, classroom.id)
      setDisplayGroups(true)
    }
  }

  const onNumberOfGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setNumberOfGroups(value)
  }

  React.useEffect(() => {
    if (classrooms) {
      const classroom = classrooms.find((f: any) => f.name === params.name)
      setClassroom(classroom)

      // if (!!classroom?.groups) {
      //   setDisplayGroups(true)
      // }
    }
  }, [classrooms])

  if (!classroom) return null
  return (
    <section>
      <section>
        <h1 className="text-3xl mb-2 font-semibold">
          Klass: {classroom?.name}
        </h1>
        <div className="flex justify-between mb-1">
          <input
            className="md:max-w-half border placeholder-grey border-light-grey rounded-md pl-1 pr-1 flex-1"
            placeholder="Sök efter elev"
          />
          <Button onClick={toggleClassroomEdit}>Redigera</Button>
        </div>
      </section>
      <section className="mb-2">
        {classroom?.students && (
          <>
            <label htmlFor="quantity">
              Dela upp {classroom.students.length} elev(er) i
              <input
                id="quantity"
                name="numberOfGroups"
                style={{
                  maxWidth: "62px",
                }}
                type="number"
                value={numberOfGroups}
                className="md:max-w-half border-2 placeholder-grey border-dark rounded-md ml-0.5 mr-0.5 p-0.25 pl-0.5"
                min="2"
                onChange={onNumberOfGroupsChange}
                max="99"
              />
              grupper.
            </label>
          </>
        )}
        <div className="flex gap-1 mt-0.5">
          <Button
            onClick={() => classroom?.students && groupUp(classroom.students)}
          >
            {displayGroups ? "Omgruppera" : "Gruppera"}
          </Button>
          <Button onClick={resetFiltering}>Återställ</Button>
        </div>
      </section>
      <Divider />
      {editClassroom && (
        <>
          <StudentForm classroom={classroom!} />
          <Divider />
        </>
      )}
      {displayGroups ? (
        <StudentGroup groups={classroom.groups} editClassroom={editClassroom} />
      ) : (
        <section>
          <ul className="grid gap-1 grid-cols-3">
            {classroom?.students &&
              classroom?.students.map((student: IStudent) => (
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
