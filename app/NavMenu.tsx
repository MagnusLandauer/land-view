import Link from "next/link"
import { FaHeart, FaSearch } from "react-icons/fa"
import AuthButton from "./components/AuthButton"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Logo from "./components/Logo"

const NavMenu = () => {
  return (
    <Navbar maxWidth="2xl" isBordered>
      <NavbarBrand>
        <Link href="/">
          <Logo size={36} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link className="nav-link" href="/query">
            <FaSearch />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="nav-link" href="/Favorite">
            <FaHeart />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavMenu
