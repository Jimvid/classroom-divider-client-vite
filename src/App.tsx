import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"
import { ClassroomContext } from "./context/classroomContext"
// import Footer from "./components/Footer"

function App() {
  const classroomContext = React.useContext(ClassroomContext)
  const { getClassrooms } = classroomContext as any

  useEffect(() => {
    getClassrooms()
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-wrapper mt-2 mb-2 mr-auto ml-auto pl-1 pr-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App
