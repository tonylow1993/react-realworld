import challenge from './reducers/challenge';
import challengeList from './reducers/challengeList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import profileFavorites from './reducers/profileFavorites';
import settings from './reducers/settings';

export default combineReducers({
  challenge,
  challengeList,
  auth,
  common,
  editor,
  home,
  profile,
  profileFavorites,
  settings
});
