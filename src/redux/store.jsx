import {combineReducers, compose, legacy_createStore} from "redux";
import numberReducer from './numberReducer';


function configureStore(){
    return legacy_createStore(
        combineReducers({
            add: numberReducer,
        }),

    );
}

export default configureStore();