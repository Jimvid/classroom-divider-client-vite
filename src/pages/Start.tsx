import { useAuth0 } from "@auth0/auth0-react"

const Start = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  return !isLoading && isAuthenticated ? (
    <div>
      <h1 className="text-3xl mb-2 font-semibold">
        Välkommen till 'StudentGrouper'
      </h1>
      <p>För att komma igång </p>
    </div>
  ) : (
    <div>Logged out start</div>
  )
}

export default Start
