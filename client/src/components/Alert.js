import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
    !!alerts.length &&
    alerts.map(({ id, msg, type }) => (
        <div key={id} className={`alert alert-${type}`}>
            {msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = ({ alerts }) => ({ alerts });

export default connect(mapStateToProps)(Alert);
