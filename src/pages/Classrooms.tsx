import React, { useContext } from "react"
import { ClassroomContext } from "@/context/classroomContext"
import ClassroomForm from "@/components/ClassroomForm"
import ClassroomList from "@/components/ClassroomList"
import Divider from "@/components/Divider"

const Dashboard = () => {
  const classroomContext = useContext(ClassroomContext)
  const { classrooms, addClassroom, deleteClassroom } = classroomContext as any
  const [classroom, setClassroom] = React.useState({ name: "" })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroom({ ...classroom, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addClassroom(classroom)
    setClassroom({ name: "" })
  }

  return (
    <div>
      <h1 className="text-3xl mb-2 font-semibold">Mina klasser</h1>
      <ClassroomForm
        onSubmit={onSubmit}
        onChange={onChange}
        name={classroom.name}
      />
      <Divider />
      <ClassroomList
        classrooms={classrooms}
        onClassroomDelete={deleteClassroom}
      />
    </div>
  )
}

export default Dashboard
