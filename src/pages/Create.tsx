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
    Select
} from '@chakra-ui/react';
import { API } from "../utils/const";
import { INote, ICountryTime } from "../types/types";

const Create = () => {

    const [timeZones, setTimeZones] = useState([]);

    const [time, setTime] = useState<INote>({
        text: "",
        sign: "",
        tz: "",
        date: "12"
    });


    async function getTimeZone(){

        const res = await fetch(API);
        const dataJson = await res.json();
    
        setTimeZones(dataJson);
    }
    
    useEffect( () => {

        getTimeZone();
        
    }, []);

    useEffect(() => {

        console.log(time);
    }, [time]);


    const handleChange = (e: ChangeEvent<HTMLTextAreaElement| HTMLInputElement | HTMLSelectElement>) => {

        setTime(
            {
                ...time,
                [e.target.name]: e.target.value
            }
        );

    }


    return (
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
                    {timeZones.map((item) => {
                        return <option value={item}>{item}</option>
                    })}
                </Select>
            </Flex>
        </Flex>
    );
}

export default Create;