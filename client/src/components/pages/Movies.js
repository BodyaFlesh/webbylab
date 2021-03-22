import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

//redux
import { connect } from 'react-redux';
import { changeMainTitle } from '../../actions/mainActions';

//hoc 
import { withApiService } from '../hoc';

//elements
import Pagination from '../elements/another/pagination';
import { ErrorBoundary } from '../elements/error';
import Item from '../elements/movies/Item';
import Spinner from '../elements/spinner'
import { Input } from '../elements/form';

class Movies extends Component {

    state = {
        loading: true,
        currentPage: 1,
        count: 0,
        perPage: 8,
        search: '',
        posts: []
    }

    validate = (field) => {
        const reg = /[\u0401\u0451\u0410-\u044f]/;
        if(reg.test(field)){
            NotificationManager.error('Error', 'The search word can consist of Latin characters and numbers', 5000);
            return true;
        }
        return false;
    }

    changePage = async (page) => {
        const { movieQueryGet } = this.props.apiService;
        const { search } = this.state;

        if(this.validate(search)){
            return false;
        }

        const { data: { posts, count } } = await movieQueryGet({page, search});
        this.setState({
            posts,
            count,  
            currentPage : page
        })
    }

    onChange = ({ value }) => {
        this.setState({
            search: value
        })
    }

    async componentDidMount(){
        const { movieQueryGet } = this.props.apiService;
        const { changeMainTitle } = this.props;
        const { currentPage, search } = this.state;

        changeMainTitle('List of movies');

        try{
            const { data: { posts, count } } = await movieQueryGet({page: currentPage, search});
            this.setState({
                posts,
                count,
                loading: false
            })
        }catch(error){
            console.error(error);
        }
    }

    render(){

        const { loading, posts, count, currentPage, perPage, search } = this.state;

        if(loading){
            return <Spinner />
        }

        return(
            <ErrorBoundary>
                <div className="container-fluid">
                    <div className="row m-b-20">
                        <div className="col-sm-9">
                            <Input text="Search" placeholder="Search by name movie or first name actor in the movie" keyProp="search" value={search} onChange={this.onChange} />
                        </div>
                        <div className="col-sm-3">
                            <button type="button" onClick={() => this.changePage(1)} className="btn btn-primary btn-block">Search</button>
                        </div>
                    </div>
                    <div className="row">
                        {
                            posts.map(el => (
                                <Item post={el} key={el.id} />
                            ))
                        }
                    </div>
                    <Pagination perPage={perPage} count={count} currentPage={currentPage} changePage={this.changePage} />
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