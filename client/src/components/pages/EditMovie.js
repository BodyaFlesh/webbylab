import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

//redux
import { connect } from 'react-redux';
import { changeMainTitle } from '../../actions/mainActions';

//hoc 
import { withApiService } from '../hoc';

import { ErrorBoundary } from '../elements/error';

//elements
import { Input, Actions, Wrapper } from '../elements/form';



class CreateMovie extends Component{

    state = {
        loading: true,
        post: {
            id: null,
            name : '', 
            year: '',
            created_at : "", 
            updated_at : ""
        }
    }

    onDelete = async () => {
        const { post: { id } } = this.state;
        const { movieDelete } = this.props.apiService;

        try{
            await movieDelete(id);
            NotificationManager.success("Success", "Movie was deleted", 2000);
            setTimeout(() => {
                this.props.history.push('/movies');
            }, 2500)
        }catch(error){
            console.error(error);
            NotificationManager.error('Error', 'Something went wrong', 5000);
        }
    }

    onUpdate = async () => {
        const { changeMainTitle } = this.props;
        const { post } = this.state;
        const { movieUpdate } = this.props.apiService;
        changeMainTitle(post.name);

        try{
            await movieUpdate(post.id, { ...post });
            NotificationManager.success("Success", "Movie was updated", 2000);
        }catch(error){
            console.error(error);
            NotificationManager.error('Error', 'Something went wrong', 5000);
        }
    }

    onCreate = async () => {
        const { post } = this.state;
        const { categoryCreate } = this.props.apiService;

        try{
            const { data: { id } } = await categoryCreate({
                ...post
            });
            NotificationManager.success("Success", "Movie was created", 2000);
            
            setTimeout(() => {
                this.props.history.push(`/movies/${id}/edit`);
            }, 2500);
        }catch(error){
            console.error(error);
            NotificationManager.error('Error', 'Something went wrong', 5000);
        }
        
    }

    onChange = ({ keyProp, value }) => {
        
        const { post } = this.state;
        let clonePost = { ...post };
        clonePost.translation[keyProp] = value;
        this.setState({
            post: clonePost
        })
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

        //dates
        if(id){
            dates = (
                <>
                    <Input text="Date of creation" keyProp="created_at" value={created_at} disabled />
                    <Input text="Date of last update" keyProp="updated_at" value={updated_at} disabled />
                </>
            )
        }

        return(
            <ErrorBoundary>
                <div className="card m-b-20">
                    <div className="card-body">
                        { 
                            <>
                            { id ? <Input text="ID" keyProp="id" value={id} onChange={this.onChange} disabled /> : '' }
                            <Input text="Name" keyProp="name" value={name} onChange={this.onChange} />
                            <Input text="Year" keyProp="description" type="number" value={year} onChange={this.onChange} />
                            <Wrapper text="Formats">
                                test
                            </Wrapper>
                            <Wrapper text="Actors">
                                Actors
                            </Wrapper>
                            { dates }
                            <Actions onDelete={this.onDelete} onCreate={this.onCreate} onUpdate={this.onUpdate} id={id} />
                            </>
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
    withApiService()(CreateMovie)
);