import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApiServiceProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';
//store
import store from './store';
//service
import { ApiService } from './services';
//compoennts
import App from './App';

const apiService = new ApiService();

ReactDOM.render(
    <Provider store={store}>
        <ApiServiceProvider value={apiService}>
            <Router>
                <App />
            </Router>
        </ApiServiceProvider>
    </Provider>,
    document.getElementById('root')
);
