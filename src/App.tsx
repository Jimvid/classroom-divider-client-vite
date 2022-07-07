import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"
import { ClassroomContext } from "./context/classroomContext"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
// import Footer from "./components/Footer"
import { ReactQueryDevtools } from "react-query/devtools"

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-wrapper mt-2 mb-2 lg:mt-4 lg:mb-4 mr-auto ml-auto pl-1 pr-1">
        <Outlet />
      </main>
      <ReactQueryDevtools />
      {/* <Footer /> */}
    </>
  )
}

export default App
