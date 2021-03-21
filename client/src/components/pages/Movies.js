import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import { changeMainTitle } from '../../actions/mainActions';

//hoc 
import { withApiService } from '../hoc';

//elements
import { ErrorBoundary } from '../elements/error';
import Item from '../elements/movies/Item';
import Spinner from '../elements/spinner'

class Movies extends Component {

    state = {
        loading: true,
        page: 1,
        search: '',
        posts: []
    }

    async componentDidMount(){
        const { movieQueryGet } = this.props.apiService;
        const { changeMainTitle } = this.props;
        const { page, search } = this.state;

        changeMainTitle('List of movies');

        try{
            const { data: { posts } } = await movieQueryGet({page, search});
            this.setState({
                posts,
                loading: false
            })
        }catch(error){
            console.error(error);
        }
    }

    render(){

        const { loading, posts } = this.state;

        if(loading){
            return <Spinner />
        }

        return(
            <ErrorBoundary>
                <div className="container-fluid">
                    <div className="row">
                        {
                            posts.map(el => (
                                <Item post={el} key={el.id} />
                            ))
                        }
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
    withApiService()(Movies)
);