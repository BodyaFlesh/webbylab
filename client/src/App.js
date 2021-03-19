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
                <div class="content">
                    <Topbar />
                    <div class="page-content-wrapper">
                        <Switch>
                            <Route path="/" component={Main} exact />
                            <Route path="/import" component={ImportMovie} />
                            <Route path="/movies" component={Movies} exact />
                            <Route path="/movies/create" component={EditMovie} />
                            <Route path="/movies/:id" component={MoviePage} />
                            <Route path="*" component={Page404} />
                        </Switch>
                    </div>
                </div>
                <footer class="footer">
                    For Webbylab
                </footer>
            </div>
        </div>
    );
}

export default App;
