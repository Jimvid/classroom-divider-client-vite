import React from "react"
import { useLocation, useParams } from "react-router-dom"
import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IClassroomContext, IStudent } from "@/types/global"
import Student from "../components/Student"
import StudentForm from "../components/StudentForm"
import Button from "@/components/Button"
import Divider from "@/components/Divider"
import { toSubarrays, shuffle } from "@/lib/helpers"
import StudentGroup from "@/components/StudentGroup"

const Classroom = () => {
  // Context
  const classroomContext = React.useContext(ClassroomContext)
  const { classrooms, getClassrooms } = classroomContext as any

  // Hooks
  const params = useParams()

  // State
  const [editClassroom, setEditClassroom] = React.useState(false)
  const [classroom, setClassroom] = React.useState<IClassroom | null>(null)
  const [numberOfGroups, setNumberOfGroups] = React.useState<number>(2)
  const [displayGroups, setDisplayGroups] = React.useState(false)
  const [groups, setGroups] = React.useState<any[]>([])

  // Functions
  const toggleClassroomEdit = () => setEditClassroom((state) => !state)

  const resetFiltering = () => {
    setNumberOfGroups(2)
    setDisplayGroups(false)
    setGroups([])
    localStorage.clear()
  }

  const groupUpStudents = (students: any[]) => {
    const groupOfStudents: any[] | undefined = toSubarrays(
      shuffle(students),
      numberOfGroups
    )
    if (groupOfStudents) {
      setGroups(groupOfStudents)
      localStorage.setItem("groups", JSON.stringify(groupOfStudents))
      setDisplayGroups(true)
    }
  }

  const onNumberOfGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setNumberOfGroups(value)
  }

  React.useEffect(() => {
    if (!classrooms) {
      // Get classroom it does not exist in context
      getClassrooms()
    } else {
      // This needs to be handled in a better way
      // Get classroom if it exist in context
      const classroom = classrooms.find((f: any) => f.name === params.name)
      setClassroom(classroom)
    }
  }, [classrooms])

  if (!classroom) return null
  return (
    <section>
      <section>
        <h1 className="text-3xl mb-2 font-semibold">
          Classroom {classroom?.name}
        </h1>
        <div className="flex justify-between mb-1">
          <input
            className="md:max-w-half border placeholder-grey border-light-grey rounded-md pl-1 pr-1 flex-1"
            placeholder="Search for student"
          />
          <Button onClick={toggleClassroomEdit}>Edit</Button>
        </div>
      </section>
      <section className="mb-2">
        {classroom?.students && (
          <>
            <label htmlFor="quantity">
              Divide all {classroom.students.length} students into groups of
            </label>
            <input
              id="quantity"
              name="numberOfGroups"
              style={{
                maxWidth: "68px",
              }}
              type="number"
              value={numberOfGroups}
              className="md:max-w-half border-2 placeholder-grey border-dark rounded-md ml-1 p-0.25 pl-0.5"
              min="2"
              onChange={onNumberOfGroupsChange}
              max="99"
            />
          </>
        )}
        <div className="flex gap-1 mt-0.5">
          <Button
            onClick={() =>
              classroom?.students && groupUpStudents(classroom.students)
            }
          >
            {displayGroups ? "Regroup" : "Group up"}
          </Button>
          <Button onClick={resetFiltering}>Reset</Button>
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
        <StudentGroup groups={groups} editClassroom={editClassroom} />
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
