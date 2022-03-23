import React, { Component } from "react";
import { Center, Heading, Box, Button, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom';


export default class NoMatch extends Component {
    render() {
        return (
            <Box bg="brand.300" height="100vh">
                <Center pt="10">
                    <VStack bg="brand.500" p="40" borderRadius="5px" maxWidth="1020px" width="50%">
                        <Heading>
                            No Page Found!
                        </Heading>
                        <Link to="/"><Button>Return Home</Button></Link>
                    </VStack>
                </Center>
            </Box>
        
        );
    }
    
}