import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner.js';
import classnames from 'classnames';


class ClientDetails extends Component {
    state = { showBalanceUpdate: false, balanceUpdateAmount: 0 }
    onChange = e => this.setState({ [e.target.name]: e.target.value })
    balanceSubmit = e => {
        e.preventDefault();
        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;
        const clientUpdate = { balance: parseFloat(balanceUpdateAmount) };
        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
        this.setState({ showBalanceUpdate: false });
    }

    onDeleteClick = () => {
        const { client, firestore, history } = this.props;
        firestore.delete({ collection: 'clients', doc: client.id })
            .then(history.push('/'));
    }

    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;
        let balanceForm = '';
        // If balance form should display 
        if (showBalanceUpdate) {
            balanceForm = (<form onSubmit={this.balanceSubmit}>

                <div style={{ marginTop: '8px' }} class="field has-addons">
                    <div class="control">
                        <input
                            type="text" placeholder="Enter new balance"
                            name="balanceUpdateAmount" class="input"
                            vale={balanceUpdateAmount} onChange={this.onChange}
                        />
                    </div>
                    <div class="control">
                        <button class="button is-info">Update</button>
                    </div>
                </div>
            </form>)
        }
        else { balanceForm = null }

        if (client) {
            let balanceStyle = {}
            if (client.balance > 0) { balanceStyle = 'has-text-danger' }
            else { balanceStyle = 'has-text-primary' }
            return (
                <div>
                    <header className="hero is-primary is-small">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">Client details</h1>
                            </div>
                        </div>
                    </header>
                    <main className="container" style={{ margin: '20px' }}>
                        <div className="columns">
                            <div className="column col-6">
                                <Link to="/" className="button">Back to Dashboard</Link>
                            </div>
                            <div className="column col-6">
                                <div className="is-pulled-right">
                                    <Link to={`/client/edit/${client.id}`} style={{ marginRight: '10px' }} className="button is-link">Edit</Link>
                                    <button onClick={this.onDeleteClick} to="/" style={{ marginRight: '10px' }} className="button is-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <section className="card" style={{ padding: '20px' }}>
                            <div style={{ padding: '10px' }} className="card-header-title">
                                <h2 className="is-size-3 ">{client.firstName} {client.firstName} </h2>
                            </div>
                            <div className="card-content">
                                <div className="columns">
                                    <div className="column is-8">
                                        <h4><strong> ClientID:</strong>
                                            {' '} {client.id}</h4>
                                    </div>
                                    <div className="column is-4">

                                        <h4>
                                            <strong>Balance: {''} </strong>
                                            <span
                                                className={balanceStyle}
                                            >£{parseFloat(client.balance).toFixed(2)}{' '}</span>
                                            <span class="icon has-text-info">
                                                <a onClick={() => this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate })}>
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>
                                            </span>
                                        </h4>
                                        {balanceForm}

                                    </div>
                                </div>
                                <hr />
                                <ul className="list is-hoverable">
                                    <li className="list-item">Contact email: {client.email}</li>
                                    <li className="list-item">Contact phone: {client.phone}</li>

                                </ul>
                            </div>
                        </section>
                    </main>
                </div >
            );
        }
        else { return <Spinner /> }
    }
}

ClientDetails.PropTypes = {
    firestore: PropTypes.object.isRequired,

}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0],
    }))
)(ClientDetails);
