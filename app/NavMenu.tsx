import Link from "next/link"
import { FaHeart } from "react-icons/fa"
import { SignInButton } from "./components/Buttons.component"

const NavMenu = () => {
  return (
    <nav className="flex gap-4 items-center justify-between p-6 border-b border-black bg-slate-700">
      <ul className="flex gap-6 items-center">
        <li>
          <Link className="nav-link" href="/query">
            Compare!
          </Link>
        </li>
        <li>
          <Link className="nav-link flex gap-2 items-center" href="/Favorite">
            Favorite <FaHeart />
          </Link>
        </li>
      </ul>
      {/* AUTH_CONTROLS */}
      <SignInButton />
    </nav>
  )
}

export default NavMenu
