import { IClassroom } from "@/types/global"
import { Link } from "react-router-dom"
import Button from "./Button"
import Icon from "@/components/Icon"

const ClassroomList = ({ classrooms, onClassroomDelete }: IClassroomList) => {
  return (
    <ul className="flex gap-1 flex-col">
      {classrooms?.map((classroom: IClassroom) => {
        return (
          <li
            className="flex flex-1 justify-between items-center shadow rounded-lg bg-white"
            key={classroom.id}
            id={`${classroom.id}`}
          >
            <Link
              to={`${window.location.pathname}/${classroom.name}`}
              className="flex-1 p-1"
            >
              <h2>{classroom.name}</h2>
            </Link>
            <button
              className="mr-1"
              onClick={() => onClassroomDelete(classroom)}
            >
              <Icon className="bg-dark" icon="trashcan" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface IClassroomList {
  classrooms: IClassroom[]
  onClassroomDelete: (classroom: IClassroom) => void
}
export default ClassroomList
