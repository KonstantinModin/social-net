import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../redux/actions";

const AddEducation = ({ addEducation }) => {
    const [state, setState] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = state;

    const handleChange = ({ target: { name, value, checked } }) => {
        if (name === "current") {
            setState((state) => ({ ...state, [name]: !!checked }));
        } else {
            setState((state) => ({ ...state, [name]: value }));
        }
    };

    const history = useHistory();
    // console.log(history);

    const handleSubmit = (e) => {
        e.preventDefault();
        addEducation(state, history);
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or courses
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or course"
                        name="school"
                        required
                        value={school}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or certificate"
                        name="degree"
                        required
                        value={degree}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={current}
                            checked={current}
                            onChange={handleChange}
                        />{" "}
                        Till now
                    </p>
                </div>
                {!current && (
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            value={to}
                            onChange={handleChange}
                            disabled={current ? "disabled" : ""}
                        />
                    </div>
                )}
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </section>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
