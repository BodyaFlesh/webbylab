import React from 'react';
import { Switch, Route } from 'react-router-dom';

//pages
import Main from './components/pages/Main';
import EditMovie from './components/pages/EditMovie';
import ImportMovie from './components/pages/ImportMovie';
import MoviePage from './components/pages/MoviePage';
import Movies from './components/pages/Movies';
import Page404 from './components/pages/Page404';

//components
import Menu from './components/elements/general/Menu';
import Topbar from './components/elements/general/Topbar';


const App = () => {
    return (
        <div id="wrapper">
            <Menu />
            <div className="content-page">
                <div className="content">
                    <Topbar />
                    <div className="page-content-wrapper">
                        <Switch>
                            <Route path="/" component={Main} exact />
                            <Route path="/import" component={ImportMovie} />
                            <Route path="/movies" component={Movies} exact />
                            <Route path="/movies/create" component={props => <EditMovie {...props} />} />
                            <Route path="/movies/:id" exact component={MoviePage} />
                            <Route path="/movies/:id/edit" component={props => <EditMovie {...props} />} />
                            <Route path="*" component={Page404} />
                        </Switch>
                    </div>
                </div>
                <footer className="footer">
                    For Webbylab
                </footer>
            </div>
        </div>
    );
}

export default App;
