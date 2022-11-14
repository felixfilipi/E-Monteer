import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './component/drawer';
import orderReducer from './component/order';
import navbarReducer from './component/navbar';
import searchReducer from './component/search';
import vehicleReducer from './component/vehicleType';

const rootReducer = combineReducers({
  drawer: drawerReducer,
  orderFail: orderReducer,
  navbar: navbarReducer,
  search: searchReducer,
  vehicle: vehicleReducer
})

export default rootReducer
