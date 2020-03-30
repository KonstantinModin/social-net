import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

// Components
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// CSS
import "./App.css";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <section className="container">
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </section>
            <Redirect to="/" />
        </BrowserRouter>
    </Provider>
);

export default App;
