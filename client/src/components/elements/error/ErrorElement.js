import React from 'react';


const ErrorElement = () => {
    return(
        <div className="card m-b-20">
            <div className="card-body">
                <div className="text-center">
                    <i className="mdi mdi-server-network-off mdi-48px red-color"></i>
                </div>
                <div className="text-center">
                    <h4 className="h4">Something went wrong</h4>
                </div>
            </div>
        </div>
    );
}

export default ErrorElement;