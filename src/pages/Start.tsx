import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Start = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  return !isLoading && isAuthenticated ? (
    <div>Logged in start</div>
  ) : (
    <div>Logged out start</div>
  )
}

export default Start
