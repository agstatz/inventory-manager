import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NoMatch, Inventory, Department, DepartmentCreate,
        DepartmentEdit, Customer, CustomerAll, CustomerSearch,Coupon,
        Category, CategoryCreate, CategorySearch} from "../pages/";
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
                <Route exact path="/department" element={<Department />} />
                <Route exact path="/department/create" element={<DepartmentCreate />} />
                <Route exact path="/department/edit" element={<DepartmentEdit />} />
                <Route exact path="/customer" element={<Customer />} />
                <Route exact path="/customer/all" element={<CustomerAll />} />
                <Route exact path="/customer/search" element={<CustomerSearch />} />
                <Route exact path="/coupon" element={<Coupon />} />
                <Route exact path="/itemcategory" element={<Category />} />
                <Route exact path="/itemcategory/create" element={<CategoryCreate />} />
                <Route exact path="/itemcategory/search" element={<CategorySearch />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>);
    }
}

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
      900: '#313638',   // dark gray
      800: '#303536',   // dark gray as well
      700: '#519872',   // dark green
      600: '#525252',   // medium gray
      500: '#cfcfcf',   // lighter gray
      300: '#c4c4c4',   // light gray
      200: '#89ce94',   // light green
      100: '#f2f4ff'    // white
    },
  }
  
  const theme = extendTheme({ colors })
 

const appDiv = document.getElementById('app');
    render(<ChakraProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ChakraProvider>, appDiv);
