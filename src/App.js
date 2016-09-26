// https://github.com/jxnblk/reflexbox
// http://jxnblk.com/rebass

import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter, Match, Miss } from 'react-router'
import { Dashboard, DashboardToolbar, About, NotFound } from './components';
import DashboardStore from './store/DashboardStore';


class App extends Component {
  static childContextTypes = {
    rebass: React.PropTypes.object,
    reflexbox: React.PropTypes.object
  }

  componentDidMount() {
    console.log('App mount')
  }

  getChildContext() {
    return {
      rebass: {
        // @TODO implement custom theme for Kentik, right here!
        //    colors: myCustomColors,
        fontSizes: [64, 48, 24, 18, 16, 14, 12],
      }
    }
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
