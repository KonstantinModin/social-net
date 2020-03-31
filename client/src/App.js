import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { loadUser } from "./redux/actions";

// Components
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// CSS
import "./App.css";

console.log("Render");

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Route exact path="/" component={Landing} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to="/" />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
