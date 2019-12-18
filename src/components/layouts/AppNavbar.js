import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner.js';
import classnames from 'classnames';

class AppNavbar extends Component {
    state = { isAuthenticated: false }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
        if (auth.uid) { return { isAuthenticated: true } }
        else { return { isAuthenticated: false } }
    }

    onLogoutClick = e => {
        e.preventDefault();
        const { firebase } = this.props;
        firebase.logout();
    }

    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        return (
            <div>
                <nav className="navbar is-link " role="navigation" aria-label="main navigation">
                    <div className="navbar-menu">
                        <div id="navbarBasicExample" class="navbar-menu ">

                            {isAuthenticated ?
                                (
                                    <div className="navbar-end">
                                        <li className="navbar-item">
                                            <Link className="nav-link has-text-white" to="/">Dashboard</Link>
                                        </li>
                                        <li className="navbar-item">
                                            <Link className="nav-link has-text-white" to="/">{auth.email}</Link>
                                        </li>
                                        <li className="navbar-item">
                                            <Link onClick={this.onLogoutClick} className="nav-link has-text-white" to="/">Logout</Link>
                                        </li>
                                    </div>
                                )
                                :
                                (
                                    <div className="navbar-end">
                                        <li className="navbar-item">
                                            <Link className="nav-link has-text-white" to="/login">Login</Link>
                                        </li>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

AppNavbar.PropTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavbar);

