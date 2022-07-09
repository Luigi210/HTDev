import React, {useState, useEffect} from "react";
import { 
    Box,
    Center,
    Flex,
    Heading,
    Text,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel
} from '@chakra-ui/react';
import { IListSigns, INote } from "../types/types";
import {connect} from "react-redux";


interface IListProps {
    list: INote[],
    setLists: (lists: IListSigns) => void;
}

const List = (props: IListProps) => {

    console.log("New List", props);

    return (
        <Box>
            <Flex flexWrap={"wrap"} gap={"20px"}>
                {props.list.map((value, index) => {
                    return <Box key={index.toString()}
                            w={"50%"}
                            border={"2px solid #4c5227"}
                        >
                            <Text>{value?.sign}</Text>
                            <Heading fontSize={"24px"}>Запись №: {index + 1}</Heading>
                            <Text>{value?.date?.timezone}</Text>
                            <Text>{value?.text}</Text>
                    </Box>
                })}
            </Flex>
        </Box>
    );
}

// interface MapState {
//     listReducer: IListSigns,
//     timeZoneReducer: IListSigns
// }


function mapStateToProps(state){
    
    if (state.timeZoneReducer.list) {
        console.log("0", state.timeZoneReducer.list[0]);
        return {
            list: [...state.listReducer.list, ...state.timeZoneReducer.list]
        }
    }
    else {
        return {
            list: [...state.listReducer.list]
        }
    }
    // console.log("State", state.timeZoneReducer.list);
}



function mapDispatchToProps(dispatch){
    return {
        setLists: (state: IListSigns) => dispatch({type: 'SET_LIST', value: state}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);