import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';

import App from './components/App';
import Challenge from './components/Challenge';
import Editor from './components/Editor';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Register from './components/Register';
import Settings from './components/Settings';

import "./assets/css/ionicons.css"
import "./assets/css/main.css"
import "./assets/css/titillium.css"

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="editor" component={Editor} />
        <Route path="editor/:slug" component={Editor} />
        <Route path="challenge/:id" component={Challenge} />
        <Route path="settings" component={Settings} />
        <Route path="@:username" component={Profile} />
        <Route path="@:username/favorites" component={ProfileFavorites} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
