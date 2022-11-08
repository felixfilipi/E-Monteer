import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './component/drawer';

const rootReducer = combineReducers({
  drawer: drawerReducer,
})

export default rootReducer
