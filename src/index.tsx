import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {timeZoneReducer} from "./redux/create";
import {reducer} from "./redux/reducers";


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
);