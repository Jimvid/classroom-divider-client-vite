import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import Button from "./Button"
import Icon from "./Icon"

const Header = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

  return (
    <header className="bg-dark text-white text-sm">
      <nav className="flex justify-between max-w-wrapper mx-auto">
        <div className="pt-1 pb-1">
          <Link to="/start">Classroom divider</Link>
        </div>
        <ul className="flex  gap-1 align-center">
          {isAuthenticated && (
            <>
              <li className="pt-1 pb-1">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="pt-1 pb-1">
                <Link to="/classrooms">My Classrooms</Link>
              </li>
              <li className="pt-1 pb-1">|</li>
            </>
          )}
          <li className="pt-1 pb-1">
            {!isLoading && isAuthenticated ? (
              <div className="flex justify-center items-center">
                <Button padding={false} onClick={logout}>
                  <span className="flex">
                    <span>Logout</span> <Icon className="flex" icon="arrow" />
                  </span>
                </Button>
              </div>
            ) : (
              <Button padding={false} onClick={loginWithRedirect}>
                <span>
                  <span className="flex ">
                    <span>Login</span> <Icon className="flex" icon="arrow" />
                  </span>
                </span>
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
