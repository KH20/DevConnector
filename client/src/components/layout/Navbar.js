import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
export const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/">
                        <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>{" "}
                        DevConnector
                    </Link>
                </h1>
                <ul>
                    <li>
                        <Link to="profiles.html">Developers</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};
