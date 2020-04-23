import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../redux/actions";

const Education = ({ education, deleteEducation }) => {
    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {education.map(({ _id, school, degree, from, to }) => (
                        <tr key={_id}>
                            <td>{school}</td>
                            <td className="hide-sm">{degree}</td>
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
                                    onClick={() => deleteEducation(_id)}
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

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
