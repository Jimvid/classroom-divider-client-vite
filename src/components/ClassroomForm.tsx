import React from "react"
import { createClassroom } from "@/queries/createClassroom"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQueryClient } from "react-query"
import { IClassroom } from "@/types/global"

const ClassroomForm = () => {
  const [classroom, setClassroom] = React.useState({ name: "" })
  const { getAccessTokenSilently } = useAuth0()

  // React query - create classroom
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (classroom: IClassroom) => {
      return createClassroom(classroom, getAccessTokenSilently)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classrooms")
      },
    }
  )

  // On change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroom({ ...classroom, [e.target.name]: e.target.value.trim() })
    console.log(classroom)
  }

  // On submit
  const onSubmit = (event: any) => {
    event.preventDefault()
    mutation.mutate(classroom)
  }

  return (
    <form className="flex gap-2 justify-between" onSubmit={onSubmit}>
      <input
        className="md:max-w-half border placeholder-grey border-light-grey rounded-md pl-1 pr-1 flex-1"
        onChange={onChange}
        placeholder="Lägg till en ny klass"
        name="name"
        value={classroom.name}
      />
      <input
        className="rounded-md bg-dark text-white p-0.5 pl-1.5 pr-1.5 cursor-pointer"
        type="submit"
        value="Lägg till"
      />
    </form>
  )
}

export default ClassroomForm
