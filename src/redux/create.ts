import { INote } from "../types/types";
import { ITimeZone } from "../types/types";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/functions";


const get: ITimeZone = getFromLocalStorage("dataNlist");


const timeZone: ITimeZone = !get ? {
    data: {
        text: "",
        sign: "",
        tz: "",
    },
    list: []
} : {...get};


interface TimeZoneAction {
    type: string,
    value: ITimeZone
}

export function timeZoneReducer(state=timeZone, action: TimeZoneAction) {
    switch (action.type) {
        case "SET":
            
            saveToLocalStorage("dataNlist", 
                {
                    data: {
                        text: action.value.data.text,
                        tz: action.value.data.tz,
                        sign: action.value.data.sign,
                        date: action.value.data.date
                    },
                    list: [
                        ...state.list
                    ]
                }
            );

            return {
                data: {
                    text: action.value.data.text,
                    tz: action.value.data.tz,
                    sign: action.value.data.sign,
                    date: action.value.data.date
                },
                list: [
                    ...state.list
                ]
            }
    
        case "SET_LIST_FROM_CREATE":
            return {
                list: [...state.list, state.data]
            }

        default:
            return state
    }
}