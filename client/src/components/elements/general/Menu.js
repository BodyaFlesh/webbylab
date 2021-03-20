import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <div className="left side-menu">
            <div className="topbar-left">
                <div className="">
                    <Link to="/" className="logo text-center">Movie 3000</Link>
                </div>
            </div>

            <div className="sidebar-inner slimscrollleft">
                <div id="sidebar-menu">
                    <ul>
                        <li>
                            <Link to="/import">
                                <i class="dripicons-device-desktop"></i>
                                <span> Import Movies </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies">
                                <i class="dripicons-device-desktop"></i>
                                <span> Movies </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies/create">
                                <i class="dripicons-device-desktop"></i>
                                <span> Create Movie </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    )
}

export default Menu;