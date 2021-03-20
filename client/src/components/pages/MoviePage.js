import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { changeMainTitle } from '../../actions/mainActions';

//hoc 
import { withApiService } from '../hoc';

import { ErrorBoundary } from '../elements/error';

class MoviePage extends Component{

    state = {
        loading: true,
        post: {
            id: null,
            name : '', 
            year: '',
            actors: [],
            formats: [],
            created_at : "", 
            updated_at : ""
        }
    }

    async componentDidMount(){
        const { movieGet } = this.props.apiService;
        const { changeMainTitle } = this.props;
        const { id } = this.props.match.params; 

        if(id){
            try{
                const { data } = await movieGet(id);
                this.setState({
                    post: data
                })
                changeMainTitle(data.name);
            }catch(error){
                console.error(error);
            }
        }else{
            changeMainTitle('Create new category');
        }
    }

    render(){
        let dates = null;
        const { id, name, year, created_at, updated_at } = this.state.post;

        return(
            <ErrorBoundary>
                <div className="card m-b-20">
                    <div className="card-body">
                        <ul className="list-group list-group-flush m-b-30">
                            <li className="list-group-item">
                                <span>Movie ID:</span> 
                                <b>#1</b>
                            </li>
                            <li className="list-group-item">
                                <span>Movie Name:</span> 
                                <b>Movie</b>
                            </li>
                            <li className="list-group-item">
                                <span>Year:</span> 
                                <b>1999</b>
                            </li>
                            <li className="list-group-item">
                                <span>Formats:</span> 
                                <b>format</b>
                            </li>
                            <li className="list-group-item">
                                <span>Actors:</span> 
                                <b>actor, actor, actor</b>
                            </li>
                        </ul>
                        <div className="btn-group btn-group-toggle">
                            <Link to="/movies/1/edit" className="btn btn-success">Edit movie</Link>
                            {/* <button type="button" className="btn btn-success">Edit movie</button>
                            <button type="button" className="btn btn-danger">Delete movie</button> */}
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        )
    }

}

const mapDispatchToProps = {
    changeMainTitle
}

export default connect(null, mapDispatchToProps)(
    withApiService()(MoviePage)
);