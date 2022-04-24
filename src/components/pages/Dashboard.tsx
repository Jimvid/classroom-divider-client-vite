import React, { useContext } from "react"
import { ClassroomContext } from "@/context/classroomContext"
import { Classroom as IClassroom } from "../../types/global"

const Dashboard = () => {
  const classroomContext = useContext(ClassroomContext)
  const { classrooms, getClassrooms } = classroomContext as any

  React.useEffect(() => {
    getClassrooms()
  }, [])

  return (
    <div>
      <h1 className="text-3xl mb-2">Classrooms</h1>
      <ul className="flex gap-1 flex-col">
        {classrooms?.map((classroom: IClassroom) => {
          return (
            <li
              className="flex flex-1 justify-between items-center shadow rounded-lg bg-white"
              key={classroom.id}
            >
              <a className="flex-1 p-1">
                <h2>{classroom.name}</h2>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Dashboard
