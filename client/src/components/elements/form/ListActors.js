import React, { Component } from 'react';

class ListActors extends Component{

    // handle input change
    handleInputChange = (e, index) => {
        const { list, setList } = this.props;
        const { name, value } = e.target;
        const listClone = [...list];
        listClone[index] = value;
        setList(listClone);
    };

    // handle click event of the Remove button
    handleRemoveClick = index => {
        const { list, setList } = this.props;
        const listClone = [...list];
        listClone.splice(index, 1);
        setList(listClone);
    };

    // handle click event of the Add button
    handleAddClick = () => {
        const { list, setList } = this.props;
        setList([...list, ""]);
    };

    render(){

        const { list } = this.props;

        return(
            <>
                {list.map((x, i) => {
                    return (
                        <div key={i}>
                            <div className="row m-b-20">
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter first and last name of the actor"
                                        value={x}
                                        onChange={e => this.handleInputChange(e, i)}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    {
                                        list.length !== 1 
                                        && <button className="btn btn-danger" onClick={() => this.handleRemoveClick(i)}>Remove</button>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div>
                    <button className="btn btn-success" onClick={this.handleAddClick}>Add</button>
                </div>
            </>
        )
    }
}

export default ListActors;