import { INote } from "../types/types";
import { IListSigns } from "../types/types";


export const listData: IListSigns = { 

    list: []
};



interface ListAction {

    type: string,
    value: IListSigns
}



export function listReducer(state=listData, action: ListAction) {
    switch (action.type) {
        case "SET_LIST":
            
            return {
                list: [...action.value.list]
            }
    
        default:
            return state
    }
}
