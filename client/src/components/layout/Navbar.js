import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link onClick={logout} to="#!">
                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>{" "}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="#!">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <Fragment>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/">
                        <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>{" "}
                        DevConnector
                    </Link>
                </h1>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </nav>
        </Fragment>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
