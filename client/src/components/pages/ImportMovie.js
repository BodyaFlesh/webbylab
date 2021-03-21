import React, { Component } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { NotificationManager } from 'react-notifications';

//redux
import { connect } from 'react-redux';
import { changeMainTitle } from '../../actions/mainActions';

//hoc
import { withApiService } from '../hoc';

//elements
import { ErrorBoundary } from '../elements/error';

class ImportMovie extends Component { 

    state = {
        data: []
    }

    convertStringToJson = (string) => {
        let array = string.split('Title:');
        array = array.filter(el => el && el.length !== 0);
        array = array.map(el => {
            let [name, year, format, actors] = el.trim().split(/Year:|Format:|Stars:/);
            return {
                name: name.trim(),
                year: year.trim(),
                format: format.trim(),
                actors: actors.split(', ')
            }
        });
        this.setState({
            data: array
        })
    }

    readFile = (value) => {
        const file = value.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
            let data = e.target.result;
            var zip = new PizZip(data);
            var doc = new Docxtemplater().loadZip(zip, { linebreaks: true });
            var text = doc.getFullText();
            this.convertStringToJson(text);

        };
        reader.readAsBinaryString(file);
    }

    uploadData = async () => {
        const { importMovies } = this.props.apiService;
        const { data } = this.state;

        try{
            await importMovies({posts: data});
            NotificationManager.success("Success", "Movies were updated", 2000);
            setTimeout(() => {
                this.props.history.push(`/movies/`);
            }, 2500);
        }catch(error){
            console.error(error);
            NotificationManager.error('Error', 'Something went wrong', 5000);
        }
    }

    async componentDidMount(){
        
        const { changeMainTitle } = this.props;

        changeMainTitle('Import movies');
    }

    render(){
        const { data } = this.state;
        return(
            <ErrorBoundary>
                <div className="card m-b-20">
                    <div className="card-body">
                        <div className="row m-b-20">
                            <div className="col-sm-9">
                                <input type="file" onChange={this.readFile} name="filewithmovies" className="form-control" accept=".docx" />
                            </div>
                            <div className="col-sm-3">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-block" 
                                    onClick={this.uploadData}
                                    disabled={data.length === 0 ? true : false}
                                >Upload data</button>
                            </div>
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
    withApiService()(ImportMovie)
);