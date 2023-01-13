import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './component/drawer';
import orderTypeReducer from './component/orderType';
import orderFailReducer from './component/orderFail';
import navbarReducer from './component/navbar';
import searchReducer from './component/search';
import vehicleReducer from './component/vehicleType';
import latitudeReducer from './component/latitude';
import longitudeReducer from './component/longitude';
import role from './component/role';
import estimationConfirmation from './component/estimationConfirmation';
import serviceCostApp from './component/serviceCostApp';
import costListApp from './component/costListApp';
import cancelOrder from './component/cancelOrder';
import custMechanic from './component/custMechanic';
import orderCreated from './component/orderCreated';
import userAuth from './component/userAuth';
import orderTimer from './component/orderTimer';

const rootReducer = combineReducers({
  drawer: drawerReducer,
  orderFail: orderFailReducer,
  orderType: orderTypeReducer,
  navbar: navbarReducer,
  search: searchReducer,
  vehicle: vehicleReducer,
  latitude: latitudeReducer,
  longitude: longitudeReducer,
  role: role,
  estimationConfirmation: estimationConfirmation,
  serviceCostApp: serviceCostApp,
  costListApp: costListApp,
  cancelOrder: cancelOrder,
  custMechanic: custMechanic,
  orderCreated: orderCreated,
  userAuth: userAuth,
  orderTimer: orderTimer
})

export default rootReducer
