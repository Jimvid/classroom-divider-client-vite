import { IClassroom } from "@/types/global"
import { Link } from "react-router-dom"
import Icon from "@/components/Icon"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAllClassrooms } from "@/queries/classroom/getAllClassrooms"
import { useAuth0 } from "@auth0/auth0-react"
import { deleteClassroom } from "@/queries/classroom/deleteClassroom"

const ClassroomList = () => {
  const { getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()

  // Get all classrooms
  const { isLoading, error, data } = useQuery<FetchResponse>("classrooms", () =>
    getAllClassrooms(getAccessTokenSilently)
  )

  // React query - create classroom
  const mutation = useMutation(
    (classroom: IClassroom) => {
      return deleteClassroom(classroom, getAccessTokenSilently)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(data.id)
      },
    }
  )

  // If loading display spinner
  if (isLoading) {
    return <div style={{ width: "100%", textAlign: "center" }}>Loading...</div>
  }

  // If error display error
  if (error) {
    return <div>{"An error has occurred: " + error}</div>
  }

  const onDeleteClassroom = (classroom: IClassroom) => {
    mutation.mutate(classroom)
  }

  return (
    <ul className="flex gap-1 flex-col">
      {Array.isArray(data) &&
        data.map((classroom: IClassroom) => {
          return (
            <li
              className="flex flex-1 justify-between items-center shadow rounded-lg bg-white"
              key={classroom.id}
              id={`${classroom.id}`}
            >
              <Link
                to={`${window.location.pathname}/${classroom.id}`}
                className="flex-1 p-1 font-medium text-2xl"
              >
                <h2>{classroom.name}</h2>
              </Link>
              <button
                className="mr-1"
                onClick={(event) => onDeleteClassroom(classroom)}
              >
                <Icon className="bg-dark" icon="trashcan" />
              </button>
            </li>
          )
        })}
    </ul>
  )
}

interface FetchResponse {
  isLoading: boolean
  error: {
    message: string
  }
  data: IClassroom[]
}
export default ClassroomList
