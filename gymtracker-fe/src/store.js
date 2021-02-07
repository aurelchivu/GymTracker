import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { USER_LOGOUT } from './constants/userConstants';

import {
  userLoginReducer,
  userRegisterReducer,
  userGoogleAuthReducer,
  userDetailsReducer,
  //   userUpdateProfileReducer,
  //   userListReducer,
  //   userDeleteReducer,
  //   userUpdateReducer,
} from './reducers/userReducers';

import {
  workoutCreateReducer,
  workoutListReducer,
  workoutDetailsReducer,
  workoutUpdateReducer,
  workoutDeleteReducer,
} from './reducers/workoutReducers';

import {
  setCreateReducer,
  setListReducer,
  setDetailsReducer,
  setUpdateReducer,
  setDeleteReducer,
} from './reducers/setReducers';

import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
} from './reducers/mealReducers';

import {
  measurementCreateReducer,
  measurementListReducer,
  measurementDetailsReducer,
  measurementUpdateReducer,
  measurementDeleteReducer,
} from './reducers/measurementReducers';

const appReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userGoogleAuth: userGoogleAuthReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userUpdate: userUpdateReducer

  workoutCreate: workoutCreateReducer,
  workoutList: workoutListReducer,
  // workoutDetails: workoutDetailsReducer,
  // workoutUpdate: workoutUpdateReducer,
  // workoutDelete: workoutDeleteReducer,

  setCreate: setCreateReducer,
  setList: setListReducer,
  // setDetails: setDetailsReducer,
  // setUpdate: setUpdateReducer,
  // setDelete: setDeleteReducer,

  measurementCreate: measurementCreateReducer,
  measurementList: measurementListReducer,
  // measurementDetails: measurementDetailsReducer,
  // measurementUpdate: measurementUpdateReducer,
  // measurementDelete: measurementDeleteReducer,

  // mealList: mealListReducer,
  // mealDetails: mealDetailsReducer,
  // mealDelete: mealDeleteReducer,
  // mealCreate: mealCreateReducer,
  // mealUpdate: mealUpdateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root');
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
