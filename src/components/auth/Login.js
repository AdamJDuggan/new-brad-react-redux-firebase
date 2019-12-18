import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner.js';
import classnames from 'classnames';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layouts/Alert';



class Login extends Component {
    state = { email: '', password: '' }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        firebase.login({ email, password })
            .then(() => console.log('logged in'))
            .catch(err => notifyUser('Invalid Login credentials', 'error'))
    }

    render() {
        const { message, messageType } = this.props.notify;
        return (
            <div>
                <header className="hero is-primary is-small">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Login</h1>
                        </div>
                    </div>
                </header>
                <main className="container" style={{ margin: '20px' }}>
                    <form onSubmit={this.onSubmit} action="" style={{ padding: '10px' }} className="block">
                        {message && <Alert message={message} messageType={messageType} />}
                        <div className="field">
                            <label htmlFor="email" className="label">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="input"
                                minLength="4"
                                required
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password" className="label">Password</label>
                            <input
                                type="text"
                                name="password"
                                className="input"
                                minLength="4"
                                required
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <button className="button is-primary" type="submit">Submit</button>

                    </form>
                </main>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), { notifyUser })
)(Login)
