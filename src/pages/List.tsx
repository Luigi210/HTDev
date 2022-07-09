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
import { IListSigns, INote, IListProps  } from "../types/types";
import {connect} from "react-redux";



const List = (props: IListProps) => {

    console.log("New List", props);


    return (
        <Box>
            <Flex flexWrap={"wrap"} gap={"20px"}>
                {props.list.map((value, index) => {
                    return <Box key={index.toString()}
                            w={"45%"}
                            border={"2px solid #4c5227"}
                            p={"15px"}
                        >
                            <Text>{value?.sign}</Text>
                            <Heading fontSize={"24px"}>Запись №: {index + 1}</Heading>
                            <Text>{value?.date?.datetime}</Text>
                            <Text>{value?.text}</Text>
                    </Box>
                })}
            </Flex>
        </Box>
    );
}



function mapStateToProps(state){

    console.log("ListState", state)
    
    if (state.timeZoneReducer.list) {
        console.log("0", state.timeZoneReducer.list[0]);
        return {
            list: [...state.listReducer.list, ...state.timeZoneReducer.list]
        }
    }
    else {
        console.log("1", state.timeZoneReducer.data);
        return {
            list: [...state.listReducer.list, state.timeZoneReducer.data]
        }
    }
}



function mapDispatchToProps(dispatch){
    return {
        setLists: (state: IListSigns) => dispatch({type: 'SET_LIST', value: state}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);