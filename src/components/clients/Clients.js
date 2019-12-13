import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner.js';


class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = { totalOwed: null }
    }

    // BROKEN
    // static getDerivedStateFromProps(props) {
    //     const { clients } = props;
    //     const { totalOwed } = this.state;

    //     if (clients) {
    //         // Add balance 
    //         const total = clients.reduce((total, client) => {
    //             return total + parseFloat(client.balance.toString())
    //         }, 0)
    //         return { totalOwed: total }
    //     }
    //     return null
    // }


    render() {
        const { clients } = this.props;
        const { totalOwed } = this.state;



        if (clients) {
            return (
                <div>
                    <section className="block" style={{ padding: '15px' }}>
                        <div className="columns">
                            <div className="column is-6">
                                <h2 className="title">Clients</h2>
                            </div>
                            <div className="column is-6">
                                <h2 className="is-3 is-pulled-right">Total owed:
                                <span className="is-primary">
                                        £{parseFloat(this.state.totalOwed).toFixed(2)}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Balance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.id}>
                                        <td>{client.firstName} {client.lastName}</td>
                                        <td>{client.email}</td>
                                        <td>£{parseFloat(client.balance).toFixed(2)}</td>
                                        <td><Link style={{ width: '100%' }} to={`/client/${client.id}`} className="button is-primary is-small">
                                            Details
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            )
        }
        else { return <Spinner /> }

    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients,
    }))
)(Clients);