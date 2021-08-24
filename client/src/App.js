import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Fragment } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/layout/auth/Login";
import { Register } from "./components/layout/auth/Register";
const App = () => {
    return (
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Switch>
                        <Route
                            exact
                            path="/register"
                            component={Register}
                        ></Route>
                        <Route exact path="/login" component={Login}></Route>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};

export default App;
