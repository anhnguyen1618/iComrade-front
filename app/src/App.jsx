import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import RoomContainer from './containers/Room-container.jsx';
import Login from './containers/Login.jsx';
import Main from './containers/Main.jsx';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Main}>
          <IndexRoute component={Login}/>
          <Route path='/dashboard' component={RoomContainer}/>
        </Route>
      </Router>
    );
  }
}

export default App;
