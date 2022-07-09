import {combineReducers} from "redux";
import { timeZoneReducer } from "./create";
import { listReducer } from "./list";



export const reducer = combineReducers({
    timeZoneReducer: timeZoneReducer,
    listReducer: listReducer
});