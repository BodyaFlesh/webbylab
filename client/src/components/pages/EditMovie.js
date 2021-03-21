import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { NotificationManager } from 'react-notifications';

//redux
import { connect } from 'react-redux';
import { changeMainTitle, formatsLoaded, actorsLoaded } from '../../actions/mainActions';

//hoc 
import { withApiService } from '../hoc';

import { ErrorBoundary } from '../elements/error';

//elements
import { Input, Actions, Wrapper, ListActors } from '../elements/form';



class CreateMovie extends Component{

    state = {
        loading: true,
        listsOfData: {
            customActors: [],
            selectedActors: [],
            selectedFormats: [],
        },
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
        const { post, listsOfData: { customActors, selectedActors, selectedFormats } } = this.state;
        const { movieCreate } = this.props.apiService;

        try{
            const { data: { id } } = await movieCreate({
                ...post,
                actorsIds: selectedActors.map(el => el.id),
                formatsIds: selectedFormats.map(el => el.id),
                actors: customActors
            });
            NotificationManager.success("Success", "Movie was created", 2000);
            
            setTimeout(() => {
                this.props.history.push(`/movies/${id}`);
            }, 2500);
        }catch(error){
            console.error(error);
            NotificationManager.error('Error', 'Something went wrong', 5000);
        }
        
    }

    onChange = ({ keyProp, value }) => {
        const { post } = this.state;
        let clonePost = { ...post };
        clonePost[keyProp] = value;
        this.setState({
            post: clonePost
        })
    }

    changeActorsList = (actors) => {
        const { listsOfData } = this.state;
        let cloneListOfData = { ...listsOfData };
        cloneListOfData.customActors = actors;
        this.setState({
            listsOfData: cloneListOfData
        })
    }

    onChangeList(list, custom){
        const { listsOfData } = this.state;
        let cloneListOfData = { ...listsOfData };
        cloneListOfData[custom] = list;
        this.setState({
            listsOfData: cloneListOfData
        })
    }

    async componentDidMount(){
        const { movieGet, getActors, getFormats } = this.props.apiService;
        const { changeMainTitle, actorsLoaded, formatsLoaded , actors, formats } = this.props;
        const { id } = this.props.match.params;
        
        if(actors.length === 0){
            try{
                const { data: { actors } } = await getActors();
                actorsLoaded(actors);
            }catch(error){
                console.error(error);
            }
        }
        

        if(formats.length === 0){
            try{
                const { data: { formats } } = await getFormats();
                formatsLoaded(formats);
            }catch(error){
                console.error(error);
            }
        }

        if(id){
            try{
                const { listsOfData } = this.state;
                const { data: { post } } = await movieGet(id);
                let cloneListsOfData = { ...listsOfData };
                cloneListsOfData.selectedActors = post.actors.map(el => {
                    return {
                        ...el,
                        name: `${el.first_name} ${el.last_name}`
                    }
                });
                cloneListsOfData.selectedFormats = post.formats; 
                this.setState({
                    post,
                    listsOfData: cloneListsOfData
                });
                changeMainTitle(post.name);
            }catch(error){
                this.props.history.push('/not-found');
                console.error(error);
            }
        }else{
            changeMainTitle('Create new movie');
        }
    }

    render(){
        let dates = null;
        const { actors, formats } = this.props;
        const { selectedActors, selectedFormats, customActors } = this.state.listsOfData;
        const { id, name, year, createdAt, updatedAt } = this.state.post;

        //dates
        if(id){
            dates = (
                <>
                    <Input text="Date of creation" keyProp="created_at" value={createdAt} disabled />
                    <Input text="Date of last update" keyProp="updated_at" value={updatedAt} disabled />
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
                            <Input text="Year" keyProp="year" type={id ? 'text' : 'number'} value={year} onChange={this.onChange} disabled={id ? true : false} />
                            <Wrapper text="Actors">
                                <Multiselect
                                    options={actors}
                                    selectedValues={selectedActors}
                                    displayValue="name"
                                    onSelect={(list) => this.onChangeList(list, 'selectedActors')}
                                    onRemove={(list) => this.onChangeList(list, 'selectedActors')}
                                />
                            </Wrapper>
                            <Wrapper text="Formats">
                                <Multiselect
                                    options={formats}
                                    selectedValues={selectedFormats}
                                    displayValue="name"
                                    onSelect={(list) => this.onChangeList(list, 'selectedFormats')}
                                    onRemove={(list) => this.onChangeList(list, 'selectedFormats')}
                                />
                            </Wrapper>
                            <Wrapper text="Actors">
                                <ListActors list={customActors} setList={this.changeActorsList} />
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
    changeMainTitle,
    formatsLoaded, 
    actorsLoaded
}

const mapStateToProps = ({main: {actors, formats}}) => {
    return{
        actors,
        formats
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withApiService()(CreateMovie)
);