import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Psychologists social network</h1>
                    <p className="lead">
                        Create a psychologist profile, share posts and thoughts
                        get help from other psychologists
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

export default Landing;
