import React from "react"
import ReactDOM from "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react"
import ClassroomState from "./context/classroomState"
import App from "./App"
import "./styles/index.css"
import "./styles/modern-normalize.css"
import "tailwindcss/tailwind.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Profile from "./pages/Profile"
import Start from "./pages/Start"
import Classrooms from "./pages/Classrooms"
import Classroom from "./pages/Classroom"
import Login from "./pages/Login"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2x1iyt13.eu.auth0.com"
      clientId="6T9aQNwya7r0qWtNiXuvsOi6RfESGTfN"
      redirectUri={`${window.location.origin}/start`}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      scope={import.meta.env.VITE_AUTH0_SCOPE}
    >
      <ClassroomState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="start" element={<Start />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="classrooms" element={<Classrooms />} />
              <Route path="classrooms/:name" element={<Classroom />} />
              <Route path="*" element={<div>No match</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClassroomState>
    </Auth0Provider>
  </React.StrictMode>
)
