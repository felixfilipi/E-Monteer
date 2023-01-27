import { combineReducers } from '@reduxjs/toolkit';
import drawerReducer from './component/drawer';
import orderTypeReducer from './component/orderType';
import orderFailReducer from './component/orderFail';
import navbarReducer from './component/navbar';
import searchReducer from './component/search';
import estimationConfirmation from './component/estimationConfirmation';
import serviceCostApp from './component/serviceCostApp';
import costListApp from './component/costListApp';
import cancelOrder from './component/cancelOrder';
import custMechanic from './component/custMechanic';
import orderCreated from './component/orderCreated';
import userAuth from './component/userAuth';
import orderTimer from './component/orderTimer';
import doneOrder from './component/doneOrder';
import garageData from './component/garageData';
import custLocation from './component/custLocation';
import mechLocation from './component/mechLocation';
import activeStatus from './component/activeStatus';
import transaction from './component/transaction';
import mechAvailability from './component/mechAvailability';
import acceptOrder from './component/acceptOrder';

const rootReducer = combineReducers({
  drawer: drawerReducer,
  orderFail: orderFailReducer,
  orderType: orderTypeReducer,
  navbar: navbarReducer,
  search: searchReducer,
  custLocation:custLocation,
  mechLocation:mechLocation,
  estimationConfirmation: estimationConfirmation,
  serviceCostApp: serviceCostApp,
  costListApp: costListApp,
  cancelOrder: cancelOrder,
  custMechanic: custMechanic,
  orderCreated: orderCreated,
  userAuth: userAuth,
  orderTimer: orderTimer,
  doneOrder: doneOrder,
  garageData: garageData,
  activeStatus: activeStatus,
  transaction: transaction,
  mechAvailability: mechAvailability,
  acceptOrder: acceptOrder,
})

export default rootReducer
