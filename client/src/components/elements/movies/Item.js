import React from 'react';
import { Link } from 'react-router-dom';

const Item = () => {
    return(
        <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="card m-b-30">
                <img className="card-img-top img-fluid" src="/images/small/img-1.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h4 className="card-title font-20 mt-0">Card title</h4>
                    <p className="card-text">Year: 2020</p>
                    <Link to="/movies/1" className="btn btn-primary">View</Link>
                </div>
            </div>
        </div>
    )
}

export default Item;