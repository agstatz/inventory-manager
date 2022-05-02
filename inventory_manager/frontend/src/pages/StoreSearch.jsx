import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    HStack,
    FormControl,
    FormErrorMessage,
    Input,
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

const MAX_SEARCH_LENGTH = 40;

export default class StoreSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store_address: '',
            search_err: false,
            stores: [],
            success: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleUpdateSearchValue = this.handleUpdateSearchValue.bind(this);
    }

    handleUpdateSearchValue = (e) => {
        this.setState({
            store_address: e.target.value,
            search_err: false,
            success: false,
            failure: '',
        });
    };

    handleSearch() {
        var isError = false;

        if (this.state.store_address.length == 0) {
            this.setState({
                search_err: true,
            });
            isError = true;
        }

        if (isError) {
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(
            '/api/get-search-store?store_address=' + this.state.store_address,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data);
                if (!data[0]) {
                    this.setState({
                        stores: [],
                    });
                    return;
                }
                if (data[0].fields) {
                    console.log(data);
                    if (data.length === 0) {
                        this.setState({
                            stores: [],
                        });
                    }

                    let list = [];
                    for (let i = 0; i < data.length; i++) {
                        list.push(data[i].fields);
                    }

                    this.setState({
                        stores: list,
                        success: true,
                    });
                } else {
                    this.setState({
                        stores: [],
                        failure: 'An error occurred.',
                    });
                }
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
                    height='100vh'
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
                                <Heading>Store</Heading>
                                <HStack spacing={2} m={2}>
                                    <FormControl
                                        isInvalid={this.state.search_err}
                                    >
                                        <Input
                                            id='customer_name'
                                            placeholder='Search Store By Address'
                                            variant='outline'
                                            bg='white'
                                            focusBorderColor='brand.200'
                                            onChange={
                                                this.handleUpdateSearchValue
                                            }
                                            maxLength={MAX_SEARCH_LENGTH}
                                        />
                                        <FormErrorMessage>
                                            Search value is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSearch}
                                    >
                                        Search
                                    </Button>
                                </HStack>
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
                                <HStack spacing={2} m={2}>
                                    <Link to='/store/'>
                                        <Button type='cancel'>Cancel</Button>
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
