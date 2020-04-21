import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { loadUser } from "./redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Components
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/forms/CreateProfile";
import EditProfile from "./components/forms/EditProfile";
import AddExperience from "./components/forms/AddExperience";

// CSS
import "./App.css";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(({ auth }) => auth.isAuthenticated);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
                path="/dashboard"
                render={() =>
                    isAuth ? <Dashboard /> : <Redirect to="/login" />
                }
            />
            <Route
                path="/create-profile"
                render={() =>
                    isAuth ? <CreateProfile /> : <Redirect to="/login" />
                }
            />
            <Route
                path="/edit-profile"
                render={() =>
                    isAuth ? <EditProfile /> : <Redirect to="/login" />
                }
            />
            <Route
                path="/add-experience"
                render={() =>
                    isAuth ? <AddExperience /> : <Redirect to="/login" />
                }
            />

            <Redirect to="/" />
        </BrowserRouter>
    );
};

export default App;
