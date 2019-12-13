import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppNavbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar is-link " role="navigation" aria-label="main navigation">
                    <div className="navbar-menu">
                        <div id="navbarBasicExample" class="navbar-menu ">
                            <div className="navbar-end">
                                <li className="navbar-item">
                                    <Link className="nav-link has-text-white" to="/">Dashboard</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="nav-link has-text-white" to="/">Landing</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="nav-link has-text-white" to="/">Landing</Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default AppNavbar;

