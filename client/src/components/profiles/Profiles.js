import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfiles } from "../../redux/actions";
import ProfileItem from "./ProfileItem";
import Alert from "../Alert";

const Profiles = ({ getProfiles, profiles, loading }) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <section className="container">
            <Alert />
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <h1 className="large text-primary">Psycologists</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and
                        connect with psycologists
                    </p>
                    <div className="profiles">
                        {profiles.length ? (
                            profiles.map((el) => (
                                <ProfileItem key={el._id} profile={el} />
                            ))
                        ) : (
                            <h4>No Profiles found </h4>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.array,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ profile: { profiles, loading } }) => ({
    profiles,
    loading,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
