import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default () => {

    return (
        <Link to="/client/add" className="button is-link">
            <i className="fas fa-plus"></i>
            New</Link>


    )

}
