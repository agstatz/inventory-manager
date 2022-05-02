import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    HStack,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: undefined,
        };
    }

    componentDidMount() {
        this.getStoreList();
    }

    getStoreList() {
        fetch('/api/get-store')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    stores: data,
                });
            });
    }

    render() {
        return (
            <>
                <Navbar />
                <Box
                    width='100%'
                    bg='brand.300'
                    color='brand.600'
                    height='100vh * 4'
                    style={{ minHeight: '100vh' }}
                >
                    <Center>
                        <Box
                            bg='brand.500'
                            borderRadius='5px'
                            maxWidth='1020px'
                            m={[10, 10, 30, 40]}
                            mt={[20, 20, 20, 20]}
                            p={1}
                        >
                            <Stack
                                m={[10, 10, 10, 10]}
                                align='center'
                                spacing={3}
                            >
                                <Heading>Stores</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Store ID</Th>
                                            <Th>Address</Th>
                                            <Th>City</Th>
                                            <Th>Country</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.stores ? (
                                            this.state.stores.map((store) => (
                                                <Tr key={store.store_id}>
                                                    <Td>{store.store_id}</Td>
                                                    <Td>
                                                        {store.store_address}
                                                    </Td>
                                                    <Td>{store.store_city}</Td>
                                                    <Td>
                                                        {store.store_country}
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Store ID</Th>
                                            <Th>Address</Th>
                                            <Th>City</Th>
                                            <Th>Country</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <HStack spacing={2} mt={2}>
                                    <Link to='/store/create'>
                                        <Button>Add a store</Button>
                                    </Link>
                                    <Link to='/store/edit'>
                                        <Button>
                                            Modify an existing store
                                        </Button>
                                    </Link>
                                    <Link to='/store/search'>
                                        <Button>Search Stores</Button>
                                    </Link>
                                    <Link to='/'>
                                        <Button>Back to Home</Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
