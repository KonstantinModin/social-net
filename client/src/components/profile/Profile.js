import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Spinner from "../Spinner";
import { getProfileById } from "../../redux/actions";

const Profile = ({ getProfileById, match, profile, loading, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match]);

    console.table({ getProfileById, match, profile, loading, auth });
    return <div>profile</div>;
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile: { profile, loading }, auth }) => ({
    loading,
    profile,
    auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
