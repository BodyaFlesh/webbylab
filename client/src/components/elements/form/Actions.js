import React, { Component } from 'react';

export default class Actions extends Component{
    
    render(){

        let { id, onCreate, onDelete, onUpdate } = this.props;

        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                    {/* { id ? <button type="button" className="btn btn-success waves-effect waves-light m-r-10" onClick={onUpdate}>Оновити</button> : ''  } */}
                    { !id && onCreate ? <button type="button" className="btn btn-success waves-effect waves-light m-r-10" onClick={onCreate}>Створити</button> : ''  }
                    { onDelete && id ? <button type="button" className="btn btn-danger waves-effect waves-light" onClick={onDelete}>Видалити</button> : null }
                </div>
            </div>
        );
    }
}