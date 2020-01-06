import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';



class AddClient extends Component {

    state = {
        firstName: '', lastName: '', phone: '', email: '', balance: ''
    };

    onChange = (e) => this.setState({ [e.target.name]: [e.target.value] });

    onSubmit = e => {
        e.preventDefault();
        const newClient = this.state;
        const { firestore, history } = this.props;
        if (newClient.balance === '') { newClient.balance = 0 }
        firestore.add({ collection: 'clients' }, newClient)
            .then(() => history.push('/'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <header className="hero is-primary is-small">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Add Client</h1>
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
                                <label htmlFor="phone" className="label">Phone</label>
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
}
AddClient.PropTypes = {
    firestore: PropTypes.object.isRequired

}

export default firestoreConnect()(AddClient);
