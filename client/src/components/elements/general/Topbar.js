import React from 'react';

import { connect } from 'react-redux';

const Topbar = ({ title }) => {
    return(
        <div className="topbar">
            <nav className="navbar-custom">
                <ul className="list-inline menu-left mb-0">
                    <li className="hide-phone list-inline-item app-search">
                        <h3 className="page-title">{title}</h3>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = ({main: {title}}) => {
    return{
        title
    }
}

export default connect(mapStateToProps)(Topbar);