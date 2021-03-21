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
                const { data: { post } } = await movieGet(id);
                console.log(post);
                this.setState({
                    post,
                    loading: false
                });
                changeMainTitle(post.name);
            }catch(error){
                console.error(error);
            }
        }else{
            changeMainTitle('Not found');
        }
    }

    render(){
        const { id, name, year, formats, actors } = this.state.post;

        const formatsArr = formats.map(el => el.name);
        const actorsArr = actors.map(({first_name, last_name}) => `${first_name} ${last_name}`);

        return(
            <ErrorBoundary>
                <div className="card m-b-20">
                    <div className="card-body">
                        <ul className="list-group list-group-flush m-b-30">
                            <li className="list-group-item">
                                <span>Movie ID:</span> 
                                <b>#{id}</b>
                            </li>
                            <li className="list-group-item">
                                <span>Movie Name:</span> 
                                <b>{name}</b>
                            </li>
                            <li className="list-group-item">
                                <span>Year:</span> 
                                <b>{year}</b>
                            </li>
                            <li className="list-group-item">
                                <span>Formats:</span> 
                                <b>{formatsArr.join(', ') || 'Information not found'}</b>
                            </li>
                            <li className="list-group-item">
                                <span>Actors:</span> 
                                <b>{actorsArr.join(', ') || 'Information not found'}</b>
                            </li>
                        </ul>
                        <div className="btn-group btn-group-toggle">
                            <Link to={`/movies/${id}/edit`} className="btn btn-success">Edit movie</Link>
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