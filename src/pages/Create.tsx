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
    TabPanel, 
    Input, 
    Textarea
} from '@chakra-ui/react';
import { API } from "../utils/const";

const Create = () => {

    const [timeZones, setTimeZones] = useState([]);


    async function getTimeZone(){

        const res = await fetch(API);
        const dataJson = await res.json();
    
        setTimeZones(dataJson);
    }
    
    useEffect( () => {

        getTimeZone();
        
    }, []);

    console.log(timeZones);

    return (
        <Flex gap={"15px"} flexDir={"column"}>
            <Box w={"100%"} minH={"100%"}>
                <Textarea placeholder={"Запись"}/>
            </Box>

            <Flex gap={"15px"}>
                <Input width={"65%"} placeholder={"Подпись"}/>
                <Input width={"35%"} placeholder={"Точное время"}/>
            </Flex>
        </Flex>
    );
}

export default Create;