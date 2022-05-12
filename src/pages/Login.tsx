import Button from "@/components/Button"
import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

const Login = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  return !isLoading && isAuthenticated ? (
    <p>It seems you are already logged in...</p>
  ) : (
    <div className="">
      <h1 className="text-3xl mb-1">Login</h1>
      <p className="mb-1">Please sign in to use the application</p>
      <Button onClick={loginWithRedirect}>Sign in</Button>
    </div>
  )
}

export default Login
