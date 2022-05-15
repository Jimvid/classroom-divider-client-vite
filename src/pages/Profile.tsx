import React, { useContext } from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading ...</div>

  return (
    <div>
      {isAuthenticated && (
        <section>
          <h1 className="text-3xl mb-2 font-semibold">Profil</h1>
          <div className="flex items-center">
            <img
              className="rounded-full mr-2"
              src={user?.picture}
              alt={user?.name}
            />
            <div>
              <h2>
                <strong>Användare:</strong> {user?.name}
              </h2>
              <p>
                <strong>Email: </strong>
                {user?.email}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Profile
