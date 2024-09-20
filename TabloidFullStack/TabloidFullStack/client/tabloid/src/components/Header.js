import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" style={{border: "6px ridge lavender"}}>
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{alignItems: "center", textAlign: "center", marginLeft: "2rem", width: "fit-content"}}>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
            <>
              <NavItem style={{marginRight: "1.5rem"}}>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>     
              </NavItem>
              <NavItem>
                  <NavLink tag={RRNavLink} to="/Post">Posts</NavLink> 
              </NavItem>
              <NavItem>
                  <NavLink tag={RRNavLink} to="/Category">Category<br/>Management</NavLink> 
              </NavItem>
              <NavItem>
                  <NavLink tag={RRNavLink} to="/Tag">Tag<br/>Management</NavLink> 
              </NavItem>       
            </>
            }
          </Nav>
          <Nav className="ml-auto" style={{marginLeft: "auto", fontWeight: "bolder"}} navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
           
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}