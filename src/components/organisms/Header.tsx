import { Link } from "react-router-dom"
import LoginButton from "../atoms/LoginButton"
import LogoutButton from "../atoms/LogoutButton"

const Header = () => {
  return (
    <header className="bg-dark text-white">
      <nav>
        <ul className="flex pt-0.75 pb-0.75 gap-2 max-w-wrapper mx-auto">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
