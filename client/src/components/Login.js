import React, { useState } from "react";
import Alert from "./Alert";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/actions";

const Login = ({ login, isAuthenticated }) => {
    const [{ email, password }, setState] = useState({
        email: "",
        password: ""
    });

    const handleInput = ({ target: { value, name } }) => {
        setState(state => ({ ...state, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const newUser = { email, password };
        console.table(newUser);
        login(newUser);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
            </p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={handleInput}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </section>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

export default connect(
    ({ auth: { isAuthenticated } }) => ({ isAuthenticated }),
    { login }
)(Login);
