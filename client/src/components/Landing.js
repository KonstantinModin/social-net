import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">PSN</h1>
                    <h1 className="x-large">Psychologists social network</h1>
                    <p className="lead">
                        Create your profile, share posts and thoughts, discuss
                        with your colleagues
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Register
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
};

export default connect(({ auth: { isAuthenticated } }) => ({
    isAuthenticated,
}))(Landing);
