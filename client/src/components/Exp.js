import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../redux/actions";

const Exp = ({ experience, deleteExperience }) => {
    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experience.map(({ _id, company, title, from, to }) => (
                        <tr key={_id}>
                            <td>{company}</td>
                            <td className="hide-sm">{title}</td>
                            <td>
                                <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
                                {to ? (
                                    <Moment format="DD/MM/YYYY">{from}</Moment>
                                ) : (
                                    "Now"
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteExperience(_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

Exp.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Exp);
