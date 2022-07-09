import React from "react";
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
import { Routes, Route, Link } from "react-router-dom";
import Create from "../pages/Create";
import List from "../pages/List";


const App = () => {

    return (
        <>
            

                <Center>Тестовое задание HTDev</Center>

                <Center>
                    <Tabs variant='enclosed' w={"50%"}>
                        <TabList>
                            <Tab>Создать запись</Tab>
                            <Tab>Записи</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Create/>
                            </TabPanel>
                            <TabPanel>
                                <List/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Center>



        </>
    );
}




export default App;