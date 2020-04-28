import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-router-dom";
import Spinner from "../Spinner";
import { getProfileById } from "../../redux/actions";

const Profile = ({ getProfileById }) => {
    return <div></div>;
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({ profile, auth });

export default connect(mapStateToProps, { getProfileById })(Profile);
