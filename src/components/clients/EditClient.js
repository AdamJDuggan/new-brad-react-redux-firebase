import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner.js';
import classnames from 'classnames';


class EditClient extends Component {
    render() {
        const { client } = this.props;
        if (client) {
            return (
                <div>
                    <header className="hero is-primary is-small">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">Edit: {client.firstName}</h1>
                            </div>
                        </div>
                    </header>
                    <main className="container" style={{ marginTop: '20px' }}>
                        <div className="columns">
                            <div className="column col-6">
                                <Link to="/" className="button">Back to Dashboard</Link>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '20px' }}>
                            <form onSubmit={this.onSubmit}>
                                <div className="field">
                                    <label htmlFor="firstName" className="label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="input"
                                        minLength="2"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="lastName" className="label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="input"
                                        minLength="2"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone" className="label">Last Name</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input"
                                        minLength="10"
                                        required
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="balance" className="label">Balance</label>
                                    <input
                                        type="text"
                                        name="balance"
                                        className="input"
                                        onChange={this.onChange}
                                        value={this.state.balance}
                                    />
                                </div>
                                <button className="button is-primary" type="submit">Submit</button>
                            </form>
                        </div>
                    </main>
                </div>
            )
        }
        else { return <Spinner /> }
    }
}

EditClient.PropTypes = {
    firestore: PropTypes.object.isRequired,

}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0],
    }))
)(EditClient);



