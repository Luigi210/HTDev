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
import { API } from "../utils/const";
import { INote, ICountryTime } from "../types/types";

const Create = () => {

    const [timeZones, setTimeZones] = useState([]);

    const [time, setTime] = useState<INote>({
        text: "",
        sign: "",
        tz: "",
    });

    const [countryObject, setCountryObject] = useState<ICountryTime>();


    async function getTimeZone(){

        const res = await fetch(API);
        const dataJson = await res.json();
    
        setTimeZones(dataJson);
    };

    async function getTimeZoneObject(){

        const res = await fetch(API + '/' + time.tz);
        const dataJson = await res.json();

        setCountryObject(dataJson);
        
    }

    useEffect( () => {
        getTimeZone();
    }, []);

    useEffect(() => {

        if (time.tz.length !== 0) {
            getTimeZoneObject();
            
        }
    }, [time.tz]);

    useEffect(() => {

        if(countryObject){
            setTime({...time, date: countryObject!});
        }
    }, [countryObject]);


    const handleChange = (e: ChangeEvent<HTMLTextAreaElement| HTMLInputElement | HTMLSelectElement>) => {

        setTime(
            {
                ...time,
                [e.target.name]: e.target.value
            }
        );

    }

    console.log(time, countryObject);

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
                <Button minW={"150px"} bg={"blue.400"} color={"#fff"}>
                    Отправить
                </Button>
            </Flex>

        </Flex>

    );
}

export default Create;