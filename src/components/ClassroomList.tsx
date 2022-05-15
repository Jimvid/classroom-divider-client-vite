import { IClassroom } from "@/types/global"
import { Link } from "react-router-dom"
import Icon from "@/components/Icon"
import { useAuth0 } from "@auth0/auth0-react"

const ClassroomList = ({ classrooms, onClassroomDelete }: IClassroomList) => {
  const { isLoading } = useAuth0()

  return (
    <ul className="flex gap-1 flex-col">
      {!isLoading ? (
        classrooms?.map((classroom: IClassroom) => {
          return (
            <li
              className="flex flex-1 justify-between items-center shadow rounded-lg bg-white"
              key={classroom.id}
              id={`${classroom.id}`}
            >
              <Link
                to={`${window.location.pathname}/${classroom.name}`}
                className="flex-1 p-1 font-medium text-2xl"
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
        })
      ) : (
        <h2 className="text-center">Laddar...</h2>
      )}
    </ul>
  )
}

interface IClassroomList {
  classrooms: IClassroom[]
  onClassroomDelete: (classroom: IClassroom) => void
}
export default ClassroomList
