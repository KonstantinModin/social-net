import React, { useEffect } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { getCurrentProfile } from "../redux/actions";
import PropTypes from "prop-types";

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Dashboard</h1>
            {loading && profile === null ? (
                <Spinner />
            ) : (
                <>
                    <p className="lead">
                        <i className="fas fa-user"></i>Welcome{" "}
                        {user && user.name}
                    </p>
                </>
            )}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth,
        profile,
    };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
