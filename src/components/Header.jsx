import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom"
import { IoCartOutline } from "react-icons/io5"
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../services/AuthContext";
import { logout } from "../services/userService";

const Header = () => {

  const { userRole, isLoggedIn } = useAuth();

  
  const navigate = useNavigate();
  
  
  const handleRedirect = () => {
    sessionStorage.removeItem("category");
    navigate("/shop");
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  }

    return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <NavLink href="/" className="text-decoration-none text-black fw-semibold fs-3">
            <img src={logo} width={40} height={28} className="me-2 mb-1" />
            Furniro.</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mt-3 mt-md-0">
            <NavLink className="header-link" to="/">Home</NavLink>
            <NavLink className="header-link" to="/shop" onClick={() => handleRedirect()}>Shop</NavLink>
            <NavLink className="header-link" to="/about">About</NavLink>
            <NavLink className="header-link" to="/contact">Contact</NavLink>
            <NavLink className="header-link" to="/cart"><IoCartOutline size={24} /></NavLink>
            <NavLink className="header-link" to="/auth">{isLoggedIn ? 
            <div onClick={() => handleLogout()}>
              <p className="d-inline me-1">{userRole}</p>
              <MdLogout />
            </div> 
            : 
            <>
              <p className="d-inline me-1 text-decoration-underline">guest</p>
              <FaUser />
            </>}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        

    )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Header