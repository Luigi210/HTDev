import React, {useState, useEffect, ChangeEvent} from "react";
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
    TabPanel, 
    Input, 
    Textarea,
    Select,
    Button
} from '@chakra-ui/react';
import {connect} from "react-redux";
import { API } from "../utils/const";
import { INote, ICountryTime, ITimeZone, IProps } from "../types/types";




const Create = (props: IProps) => {

    const [timeZones, setTimeZones] = useState([]);

    const [countryObject, setCountryObject] = useState<ICountryTime>();

    // console.log("Props", props);

    async function getTimeZone(){

        const res = await fetch(API);
        const dataJson = await res.json();
    
        setTimeZones(dataJson);
    };

    async function getTimeZoneObject(){

        const res = await fetch(API + '/' + props.data.tz);
        const dataJson = await res.json();

        setCountryObject(dataJson);
        
    }

    useEffect( () => {
        getTimeZone();
    }, []);

    useEffect(() => {

        if (props.data.tz !== '') {
            getTimeZoneObject();
            
        }

    }, [props.data.tz]);

    useEffect(() => {

        if(countryObject){
            props.setTime({data: {...props.data, date: countryObject!}});
        }
    }, [countryObject]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement| HTMLInputElement | HTMLSelectElement>) => {
        props.setTime(
            {
                data: {
                    ...props.data, 
                    [e.target.name]: e.target.value
                }
            }
        );
    };

    const submitSign = () => {
        if (props.data) {
            
            props.setList(props.data);
        }
    }


    // console.log(time, countryObject);

    return (
        <Flex flexDir={"column"} gap={"25px"}>
            <Flex gap={"15px"} flexDir={"column"}>
                <Box w={"100%"} minH={"100%"}>
                    <Textarea 
                        placeholder={"Запись"} 
                        name="text"
                        onChange={(e) => handleChange(e)}    
                    />
                </Box>

                <Flex gap={"15px"}>
                    <Input 
                        width={"65%"} 
                        placeholder={"Подпись"} 
                        name="sign"
                        onChange={(e) => handleChange(e)}        
                    />
                    <Select 
                        width={"35%"} 
                        placeholder={"Точное время"} 
                        name="tz"
                        onChange={(e) => handleChange(e)}
                    >
                        {timeZones.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </Select>
                </Flex>
            </Flex>
            
            <Flex 
                w={"100%"}
                justifyContent={"end"}
                
            >
                <Button minW={"150px"} bg={"blue.400"} color={"#fff"} onClick={submitSign}>
                    Отправить
                </Button>
            </Flex>

        </Flex>

    );
}


function mapStateToProps(state){
    
    // console.log("Cre", state);
    return {
        data: {
            tz: state.timeZoneReducer.data.tz,
            text: state.timeZoneReducer.data.text,
            sign: state.timeZoneReducer.data.sign,
            date: state.timeZoneReducer.data.date
        }
    }
}



function mapDispatchToProps(dispatch){
    return {
        setTime: (state: ITimeZone) => dispatch({type: 'SET', value: state}),
        setList: (state: ITimeZone) => dispatch({type: "SET_LIST_FROM_CREATE", value: state}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);