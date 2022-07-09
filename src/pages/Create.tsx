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
    Button,
    useToast 
} from '@chakra-ui/react';
import {connect} from "react-redux";
import { API } from "../utils/const";
import { INote, ICountryTime, ITimeZone, IProps } from "../types/types";
import { getFromLocalStorage } from "../utils/functions";




const Create = (props: IProps) => {

    const [timeZones, setTimeZones] = useState([]);

    const [countryObject, setCountryObject] = useState<ICountryTime>();
    const [isActiveButton, setActiveButton] = useState<boolean>(false);

    const toast = useToast();
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
        const res: ITimeZone = getFromLocalStorage("dataNlist");
        if(res) {
            props.setTime({...res});
        }
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

    useEffect(() => {

        
        const timeOut = setTimeout(() => {
            if (isActiveButton) {
                setActiveButton(false);
            }
        }, 2500);


        return () => {
            clearTimeout(timeOut);
        }
    }, [isActiveButton]);


    const submitSign = () => {
        setActiveButton(true);
        if (props.data.text !== '' && props.data.sign !== '' && props.data.tz !== '' && props.data.date) {
            props.setList(props.data);
            toast(
                {
                    title: 'Запись создана.',
                    description: "Вы успешно создали запись.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                }
            )
        }
        else {
            toast(
                {
                    title: 'Валидация не прошла',
                    description: "Вам стоит заполнить все поля",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                }
            )
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
                        defaultValue={props.data.text}
                    />
                </Box>

                <Flex gap={"15px"}>
                    <Input 
                        width={"65%"} 
                        placeholder={"Подпись"} 
                        name="sign"
                        onChange={(e) => handleChange(e)}    
                        defaultValue={props.data.sign}    
                    />
                    <Select 
                        width={"35%"} 
                        placeholder={"Точное время"} 
                        name="tz"
                        onChange={(e) => handleChange(e)}
                        value={props.data.tz}
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
                <Button 
                    minW={"150px"} 
                    bg={"blue.400"} 
                    color={"#fff"} 
                    onClick={submitSign}
                    isLoading={isActiveButton}
                    loadingText='Отправляется'
                >
                    Отправить
                </Button>
            </Flex>

        </Flex>

    );
}


function mapStateToProps(state){
    
    console.log("Cre", state);
    return {
        data: {
            tz: state.timeZoneReducer.data.tz,
            text: state.timeZoneReducer.data.text,
            sign: state.timeZoneReducer.data.sign,
            date: state.timeZoneReducer.data.date
        },
        list: state.timeZoneReducer.list
    }
}



function mapDispatchToProps(dispatch){
    return {
        setTime: (state: ITimeZone) => dispatch({type: 'SET', value: state}),
        setList: (state: ITimeZone) => dispatch({type: "SET_LIST_FROM_CREATE", value: state}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);