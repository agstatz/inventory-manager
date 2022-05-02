import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    HStack,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Table,
    Tooltip,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

const MAX_NAME_LENGTH = 40;

export default class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id: '',
            id_err: false,
            customer_fname: '',
            fname_err: false,
            customer_lname: '',
            lname_err: false,
            success: false,
            failure: '',
            customers: [],
        };

        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleFNameChange(e) {
        this.setState({
            customer_fname: e.target.value,
            fname_err: false,
            success: false,
            failure: '',
        });
    }

    submitSearch() {
        var isError = false;

        if (this.state.customer_fname.length == 0) {
            this.setState({
                fname_err: true,
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
            '/api/get-search-customer?first_name=' + this.state.customer_fname,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data);
                if (!data[0]) {
                    this.setState({
                        customers: [],
                    });
                    return;
                }
                if (data[0].fields) {
                    console.log(data);
                    if (data.length === 0) {
                        this.setState({
                            customers: [],
                        });
                    }

                    let list = [];
                    for (let i = 0; i < data.length; i++) {
                        list.push(data[i].fields);
                    }

                    this.setState({
                        customers: list,
                        success: true,
                    });
                } else {
                    this.setState({
                        customers: [],
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
                                <Heading>Search Customers</Heading>
                                <HStack spacing={2} m={2}>
                                    <FormControl
                                        isInvalid={this.state.fname_err}
                                    >
                                        <Input
                                            id='customer_name'
                                            placeholder='Search Customer By Name'
                                            variant='outline'
                                            bg='white'
                                            focusBorderColor='brand.200'
                                            onChange={this.handleFNameChange}
                                            maxLength={MAX_NAME_LENGTH}
                                        />
                                        <FormErrorMessage>
                                            Customer Name is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        type='submit'
                                        onClick={this.submitSearch}
                                    >
                                        Search
                                    </Button>
                                </HStack>

                                <Table size='md'>
                                    <Thead>
                                        <Tr>
                                            <Th isNumeric>ID</Th>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Address</Th>
                                            <Th isNumeric>Phone</Th>
                                            <Th
                                                id='memberTitle1'
                                                isNumeric
                                                cursor='pointer'
                                                onClick={
                                                    this.filterCustomerList
                                                }
                                            >
                                                <Tooltip label='Filter on member status'>
                                                    Member Status [all]
                                                </Tooltip>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.filtered_customers ? (
                                            this.state.filtered_customers.map(
                                                (cust) => (
                                                    <Tr key={cust.customer_id}>
                                                        <Td isNumeric>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {
                                                                    cust.customer_id
                                                                }
                                                            </Link>
                                                        </Td>
                                                        <Td>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {cust.first_name +
                                                                    ' ' +
                                                                    cust.last_name}
                                                            </Link>
                                                        </Td>
                                                        <Td>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {
                                                                    cust.email_address
                                                                }
                                                            </Link>
                                                        </Td>
                                                        <Td>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {cust.address}
                                                            </Link>
                                                        </Td>
                                                        <Td isNumeric>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {cust.phone}
                                                            </Link>
                                                        </Td>
                                                        <Td isNumeric>
                                                            <Link
                                                                to={`/customer/${cust.customer_id}`}
                                                            >
                                                                {cust.member ? (
                                                                    <CheckIcon />
                                                                ) : (
                                                                    <SmallCloseIcon />
                                                                )}
                                                            </Link>
                                                        </Td>
                                                    </Tr>
                                                )
                                            )
                                        ) : this.state.customers ? (
                                            this.state.customers.map((cust) => (
                                                <Tr key={cust.customer_id}>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.customer_id}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.first_name +
                                                                ' ' +
                                                                cust.last_name}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.email_address}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.address}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.phone}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/customer/${cust.customer_id}`}
                                                        >
                                                            {cust.member ? (
                                                                <CheckIcon />
                                                            ) : (
                                                                <SmallCloseIcon />
                                                            )}
                                                        </Link>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th isNumeric>ID</Th>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Address</Th>
                                            <Th isNumeric>Phone</Th>
                                            <Th
                                                id='memberTitle2'
                                                isNumeric
                                                cursor='pointer'
                                                onClick={
                                                    this.filterCustomerList
                                                }
                                            >
                                                <Tooltip label='Filter on member status'>
                                                    Member Status [all]
                                                </Tooltip>
                                            </Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </Stack>
                            <Center>
                                <HStack spacing={2} m={2}>
                                    <Link to='/customer/'>
                                        <Button type='cancel'>Cancel</Button>
                                    </Link>
                                </HStack>
                            </Center>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
