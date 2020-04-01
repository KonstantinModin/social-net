import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../redux/actions";
import PropTypes from "prop-types";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        <section className="container">
            <h1>Dashboard</h1>
            {profile && JSON.stringify(profile)}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth,
        profile
    };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
