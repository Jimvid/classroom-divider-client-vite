import React from "react"
import ReactDOM from "react-dom/client"
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import ClassroomState from "./context/classroomState"
import App from "./App"
import "./styles/index.css"
import "./styles/modern-normalize.css"
import "tailwindcss/tailwind.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Pages
import Profile from "./pages/Profile"
import Start from "./pages/Start"
import Classrooms from "./pages/Classrooms"
import Classroom from "./pages/Classroom"

const ProtectedRoute = ({ isAuthenticated, children }: any) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

const { isAuthenticated } = useAuth0()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2x1iyt13.eu.auth0.com"
      clientId="6T9aQNwya7r0qWtNiXuvsOi6RfESGTfN"
      redirectUri={window.location.origin}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      scope={import.meta.env.VITE_AUTH0_SCOPE}
    >
      <ClassroomState>
        <BrowserRouter>
          <Routes>
            {/* <ProtectedRoute isAuthenticated={isAuthenticated}> */}
            <Route path="/" element={<App />}>
              <Route path="start" element={<Start />} />
              <Route path="profile" element={<Profile />} />
              <Route path="classrooms" element={<Classrooms />} />
              <Route path="classrooms/:name" element={<Classroom />} />
              <Route path="*" element={<div>No match</div>} />
            </Route>
            {/* </ProtectedRoute> */}
          </Routes>
        </BrowserRouter>
      </ClassroomState>
    </Auth0Provider>
  </React.StrictMode>
)
