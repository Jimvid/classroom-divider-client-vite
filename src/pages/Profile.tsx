import React, { useContext } from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading ...</div>

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1 className="text-3xl mb-1 font-semibold">Profile</h1>
          <img className="mb-1" src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      )}
    </div>
  )
}

export default Profile
