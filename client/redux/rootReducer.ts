import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './component/drawer';
import orderTypeReducer from './component/orderType';
import orderFailReducer from './component/orderFail';
import navbarReducer from './component/navbar';
import searchReducer from './component/search';
import vehicleReducer from './component/vehicleType';
import latitudeReducer from './component/latitude';
import longitudeReducer from './component/longitude';

const rootReducer = combineReducers({
  drawer: drawerReducer,
  orderFail: orderFailReducer,
  orderType: orderTypeReducer,
  navbar: navbarReducer,
  search: searchReducer,
  vehicle: vehicleReducer,
  latitude: latitudeReducer,
  longitude: longitudeReducer,
})

export default rootReducer
