import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../img/ps.jpg";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <Link className="logo" to="/">
                <img src={logo} alt="background"></img> <h1>PSN</h1>
            </Link>
            <ul>
                <li>
                    <NavLink to="/developers">Developers</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
