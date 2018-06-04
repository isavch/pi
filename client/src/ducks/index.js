import { combineReducers } from 'redux';
import user from './login/reducer';
import photo from './photo/reducer';
import temperature from './temperature/reducer';

export default combineReducers({ user, photo, temperature });