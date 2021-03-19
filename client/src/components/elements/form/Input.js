import React, { Component } from 'react';

class Input extends Component{

    change = (event) => {
        const { onChange, keyProp, disabled } = this.props;

        if(disabled === true){
            return false;
        }

        onChange({
            value: event.target.value,
            keyProp
        });
    }

    
    render(){
        const { text, keyProp, type = 'text', disabled, value } = this.props;

        const Input = (
            type === 'textarea' 
            ? <textarea className="form-control" disabled={disabled} value={value || ''} name={keyProp} onChange={this.change}></textarea>
            : <input className="form-control" disabled={disabled} value={value || ''} name={keyProp} type={type} onChange={this.change} />
        );

        return(
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">{text}</label>
                <div className="col-sm-10">
                    { Input }
                </div>
            </div>
        )
    }
}

export default Input;