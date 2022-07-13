import ClassroomForm from "@/components/ClassroomForm"
import ClassroomList from "@/components/ClassroomList"
import Divider from "@/components/Divider"

const Dashboard = () => {
  return (
    <section>
      <h1 className="text-3xl mb-2 font-semibold">Mina klasser</h1>
      <ClassroomForm />
      <Divider />
      <ClassroomList />
    </section>
  )
}

export default Dashboard
