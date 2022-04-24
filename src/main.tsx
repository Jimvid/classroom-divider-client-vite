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
import Profile from "./components/pages/Profile"
import Home from "./components/pages/Home"
import Dashboard from "./components/pages/Dashboard"

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
            <Route path="/" element={<App />}>
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClassroomState>
    </Auth0Provider>
  </React.StrictMode>
)
