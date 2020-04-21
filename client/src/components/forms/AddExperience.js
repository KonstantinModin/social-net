import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../redux/actions";

const AddExperience = ({ addExperience }) => {
    const [state, setState] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const { title, company, location, from, to, current, description } = state;

    const handleChange = ({ target: { name, value, checked } }) => {
        if (name === "current") {
            setState((state) => ({ ...state, [name]: !!checked }));
        } else {
            setState((state) => ({ ...state, [name]: value }));
        }
    };

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        addExperience(state, history);
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any
                developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        required
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        required
                        value={company}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
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
                        Current Job
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
                        placeholder="Job Description"
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
