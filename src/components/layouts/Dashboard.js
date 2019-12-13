import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layouts/Sidebar';



export default () => {
    return (
        <div>
            <header className="hero is-primary is-small">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Dashboard</h1>
                    </div>
                </div>
            </header>
            <main className="container" style={{ marginTop: '20px' }}>
                <section className="columns">


                    <div className="column is-10">
                        <Clients />
                    </div>
                    <aside className="column is-2">
                        <Sidebar />
                    </aside>
                </section>
            </main>
        </div>
    )
}




