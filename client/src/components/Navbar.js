import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions";
import PropTypes from "prop-types";
import logo from "../img/ps.jpg";
import Spinner from "./Spinner";

const Navbar = ({ logout, isAuth, loading }) => {
    const authLinks = (
        <>
            <li>
                <NavLink to="/profiles">Psycologists</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">
                    <i className="fas fa-user"></i>
                    <span className="hide-sm"> Dashboard</span>
                </NavLink>
            </li>
            <li>
                <span className="logout" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm"> Logout</span>
                </span>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <NavLink to="/profiles">Psycologists</NavLink>
            </li>
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
            <ul>{loading ? <Spinner /> : isAuth ? authLinks : guestLinks}</ul>
        </nav>
    );
};

Navbar.propTypes = {
    isAuth: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isAuthenticated: isAuth, loading } }) => {
    return {
        isAuth,
        loading,
    };
};

export default connect(mapStateToProps, { logout })(Navbar);
