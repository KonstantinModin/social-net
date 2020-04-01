import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions";
import PropTypes from "prop-types";
import logo from "../img/ps.jpg";

const Navbar = ({ logout, isAuth }) => {
    const authLinks = (
        <>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <span onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm"> Logout</span>
                </span>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <NavLink to="/developers">Developers</NavLink>
            </li>
            <li>
                <NavLink to="/register">Register</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </>
    );

    return (
        <nav className="navbar bg-dark">
            <Link className="logo" to="/">
                <img src={logo} alt="background"></img> <h1>PSN</h1>
            </Link>
            <ul>{isAuth ? authLinks : guestLinks}</ul>
        </nav>
    );
};

Navbar.propTypes = {
    isAuth: PropTypes.bool,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth: { isAuthenticated: isAuth } }) => {
    return {
        isAuth
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
