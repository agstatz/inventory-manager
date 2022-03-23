import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NoMatch, Inventory } from "../pages/";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route exact path="/inventory" element={<Inventory />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>);
    }
}

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
      900: '#313638',
      800: '#303536',
      700: '#519872',
      600: '#525252',
      500: '#cfcfcf',
      300: '#c4c4c4',
      200: '#89ce94',
      100: '#f2f4ff'
    },
  }
  
  const theme = extendTheme({ colors })

const appDiv = document.getElementById('app');
    render(<ChakraProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ChakraProvider>, appDiv);


//import '../static/css/App.css';

/*
import { Home, NoMatch, Inventory } from "../pages/";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route exact path="/inventory" element={<Inventory />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
*/
