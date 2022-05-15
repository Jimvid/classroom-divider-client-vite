import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import Button from "./Button"
import Icon from "./Icon"

const Header = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

  return (
    <header
      style={{ minHeight: "60px" }}
      className="bg-dark text-white text-sm"
    >
      <nav className="flex justify-between max-w-wrapper mx-auto pl-1 pr-1">
        {!isLoading && (
          <div className="pt-1 pb-1 flex items-center">
            <Link to="/start">Start</Link>
          </div>
        )}
        {!isLoading && (
          <ul className="flex  gap-1 align-center items-center">
            {isAuthenticated && (
              <>
                <li className="pt-1 pb-1">
                  <Link to="/profile">Profil</Link>
                </li>
                <li className="pt-1 pb-1">
                  <Link to="/classrooms">Mina klasser</Link>
                </li>
                <li className="pt-1 pb-1">|</li>
              </>
            )}
            <li className="pt-1 pb-1">
              {!isLoading && isAuthenticated ? (
                <div className="flex justify-center items-center">
                  <Button padding={false} onClick={logout}>
                    <span className="flex center items-center">
                      <span>Logga ut</span>{" "}
                      <Icon className="flex" icon="arrow" />
                    </span>
                  </Button>
                </div>
              ) : (
                <Button padding={false} onClick={loginWithRedirect}>
                  <span>
                    <span className="flex center items-center">
                      <span>Logga in</span>{" "}
                      <Icon className="flex" icon="arrow" />
                    </span>
                  </span>
                </Button>
              )}
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
