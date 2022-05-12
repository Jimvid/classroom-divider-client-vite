import Layout from "./components/Layout"
import { Link, Outlet } from "react-router-dom"
import Header from "./components/Header"
// import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <main className="max-w-wrapper mt-2 mb-2 mr-auto ml-auto">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App
