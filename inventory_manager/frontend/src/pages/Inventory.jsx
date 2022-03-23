import React, { Component } from "react";
import { Center, Heading, Box } from '@chakra-ui/react';
import { Navbar } from "../components";

export default class Inventory extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Box width="100%" bg="brand.300" color="brand.600" height="100vh">
                    <Heading>
                        Inventory
                    </Heading>
                </Box>
                
            </>
        );
    }

}
