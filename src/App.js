import _ from 'lodash';
import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter, Match, Miss } from 'react-router'
import { Dashboard, DashboardToolbar, About, NotFound } from './components';
import DashboardStore from './store/DashboardStore';


class App extends Component {
    componentDidMount() {
        console.log('App mount')
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <DevTools />
                    <DashboardToolbar store={DashboardStore} />
                    <Match exactly pattern="/" component={Dashboard} />
                    <Match pattern="/about" component={About} />
                    <Miss component={NotFound}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
