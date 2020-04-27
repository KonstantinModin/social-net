import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfiles } from "../../redux/actions";

const Profiles = ({ getProfiles, profiles, loading }) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return loading ? (
        <Spinner />
    ) : (
        <div>
            <h1>Profiles</h1>
        </div>
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
