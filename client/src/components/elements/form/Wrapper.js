import React from 'react';

const Wrapper = ({ children, text }) => {
    return(
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">{ text || null }</label>
            <div className="col-sm-10">
                {children}
            </div>
        </div>
    )
}

export default Wrapper;