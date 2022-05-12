import { IStudent } from "@/types/global"
import { ListFormat } from "typescript"
import Student from "./Student"

const StudentGroup = ({ groups, editClassroom }: any) => {
  if (!groups) return null
  return groups.map((group: any, index: number) => (
    <section key={`Group-section-${index}`}>
      <h2 className="text-xl mb-1">Group {index + 1}</h2>
      <ul className="grid gap-1 grid-cols-3 mb-3">
        {group.map((student: IStudent) => (
          <Student
            key={student.id}
            student={student}
            editMode={editClassroom}
          />
        ))}
      </ul>
    </section>
  ))
}

export default StudentGroup
