import { INote } from "../types/types";
import { ITimeZone } from "../types/types";
import { listData } from "./list";

const timeZone: ITimeZone = {
    data: {
        text: "",
        sign: "",
        tz: "",
    }
}


interface TimeZoneAction {
    type: string,
    value: ITimeZone
}

export function timeZoneReducer(state=timeZone, action: TimeZoneAction) {
    switch (action.type) {
        case "SET":
            
            return {
                data: {
                    text: action.value.data.text,
                    tz: action.value.data.tz,
                    sign: action.value.data.sign,
                    date: action.value.data.date
                }
            }
    
        case "SET_LIST_FROM_CREATE":
            return {
                list: [...listData.list, state.data]
            }

        default:
            return state
    }
}