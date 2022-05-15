import React from "react"

const ClassroomForm = ({ onChange, onSubmit, name }: IClassroomForm) => {
  return (
    <form className="flex gap-2 justify-between" onSubmit={onSubmit}>
      <input
        className="md:max-w-half border placeholder-grey border-light-grey rounded-md pl-1 pr-1 flex-1"
        onChange={onChange}
        placeholder="Lägg till en ny klass"
        name="name"
        value={name}
      />
      <input
        className="rounded-md bg-dark text-white p-0.5 pl-1.5 pr-1.5 cursor-pointer"
        type="submit"
        value="Lägg till"
      />
    </form>
  )
}

interface IClassroomForm {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  name: string
}

export default ClassroomForm
