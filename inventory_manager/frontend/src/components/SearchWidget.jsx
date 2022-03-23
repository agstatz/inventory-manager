import React, { Component } from "react";
import { Input, InputGroup, InputLeftElement, Box, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Code } from '@chakra-ui/react'

export default class SearchWidget extends Component {
    render() {
        return (
            <Box bg="brand.300" borderRadius="5px" p="4" maxHeight="500px" maxWidth="300px">
                <Text mb='8px' py="1">Search the database below:</Text>
                <InputGroup>
                    <InputLeftElement 
                        pointerEvents='none'
                        children={<SearchIcon />}/>
                    <Input variant='outline' bg="white" placeholder='Search' focusBorderColor="brand.200" />
                </InputGroup>
                <Text py="1">Possible searches include:</Text>
                <Code colorScheme="blackAlpha">1000 Western Boulevard</Code><br />
                <Code colorScheme="blackAlpha">12/20/2020</Code><br />
                <Code colorScheme="blackAlpha">2300230</Code><br />
            </Box>
        );
    }    
}