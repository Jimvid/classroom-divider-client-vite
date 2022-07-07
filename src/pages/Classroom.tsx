import React from "react"
import { Link, useParams } from "react-router-dom"
// import { ClassroomContext } from "@/context/classroomContext"
import { IClassroom, IStudent } from "@/types/global"
import Student from "../components/Student"
import StudentForm from "../components/StudentForm"
import Button from "@/components/Button"
import Divider from "@/components/Divider"
import { toSubarrays, shuffle } from "@/lib/helpers"
import StudentGroup from "@/components/StudentGroup"
import Icon from "@/components/Icon"
import { useQuery } from "react-query"
import { getSingleClassroom } from "@/queries/classroom/getSingleClassroom"
import { useAuth0 } from "@auth0/auth0-react"

const Classroom = () => {
  // Context
  // const classroomContext = React.useContext(ClassroomContext)
  // const { classrooms, groupUpStudents, resetGroups } = classroomContext as any

  // Hooks
  const params = useParams()
  const { getAccessTokenSilently } = useAuth0()

  // State
  const [editClassroom, setEditClassroom] = React.useState(false)
  const [numberOfGroups, setNumberOfGroups] = React.useState<number>(2)
  const [displayGroups, setDisplayGroups] = React.useState(false)

  // Get single classroom
  const classroomId = params.id || ""
  if (!classroomId) return null

  const {
    isLoading,
    error,
    data: classroom,
  } = useQuery<IClassroom>(classroomId, () =>
    getSingleClassroom(classroomId, getAccessTokenSilently)
  )

  // If loading display spinner
  if (isLoading) {
    return <div style={{ width: "100%", textAlign: "center" }}>Loading...</div>
  }

  // If error display error
  if (error) {
    return <div>{"An error has occurred: " + error}</div>
  }

  // Functions
  const toggleClassroomEdit = () => {
    setEditClassroom((state) => !state)
    setDisplayGroups(false)
    // resetGroups()
    setDisplayGroups(false)
  }

  const resetFiltering = () => {
    setNumberOfGroups(2)
    setDisplayGroups(false)
    // resetGroups()
    setDisplayGroups(false)
  }

  const groupUp = (students: any[]) => {
    setEditClassroom(false)

    const groupOfStudents: any[] | undefined = toSubarrays(
      shuffle([...students.filter((student) => !student?.disabled)]),
      numberOfGroups
    )

    if (groupOfStudents && classroom) {
      // groupUpStudents(groupOfStudents, classroom.id)
      setDisplayGroups(true)
    }
  }

  const onNumberOfGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setNumberOfGroups(value)
  }

  // React.useEffect(() => {
  //   if (classrooms) {
  //     const classroom = classrooms.find((f: any) => f.name === params.name)
  //     setClassroom(classroom)

  //     if (classroom?.groups?.length > 1) {
  //       setDisplayGroups(true)
  //     }
  //   }
  // }, [classrooms])

  if (!classroom) return null
  return (
    <section>
      <section className="flex mb-2 items-center">
        <Link
          className="flex bg-dark rounded-full mr-1 rotate-180 items-center justify-center hover:scale-110 transition-all"
          style={{
            width: "30px",
            height: "30px",
          }}
          to="/classrooms"
        >
          <Icon className="flex scale-150" icon="arrow" />
        </Link>
        <h1 className="text-3xl font-semibold">Klass: {classroom?.name}</h1>
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
        <div className="flex gap-1 mt-1">
          <Button
            onClick={() => classroom?.students && groupUp(classroom.students)}
          >
            {displayGroups ? "Omgruppera" : "Gruppera"}
          </Button>
          <Button onClick={resetFiltering}>Återställ</Button>
          <Button onClick={toggleClassroomEdit}>Redigera</Button>
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
