import { configureStore,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import authReducer from "../features/auth/authSlice";



const rootReducer=combineReducers({
  auth:authReducer,
})

const persistConfig={
  key:"root",
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false})

})
export const persistor = persistStore(store);