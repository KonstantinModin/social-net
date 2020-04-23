import React, { useEffect } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";
import DashActions from "./DashActions";
import Exp from "./Exp";
import Education from "./Educ";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../redux/actions";
import PropTypes from "prop-types";

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
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
                    {profile !== null ? (
                        <>
                            <DashActions />
                            <Exp experience={profile.experience} />
                            <Education education={profile.education} />
                            <div className="my-2">
                                <button
                                    className="btn btn-danger"
                                    onClick={deleteAccount}
                                >
                                    <i className="fas fa-user-minus"></i> Delete
                                    My Account
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>
                                You have not yet setup a profile, please add
                                some info
                            </p>
                            <Link
                                to="/create-profile"
                                className="btn btn-primary my-1"
                            >
                                Create Profile
                            </Link>
                        </>
                    )}
                </>
            )}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth,
        profile,
    };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
