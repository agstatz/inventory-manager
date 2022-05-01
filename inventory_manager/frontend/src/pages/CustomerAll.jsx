import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    Tooltip,
    Table,
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

class CustomerTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: undefined,
            filter: 'none',
        };

        this.filterCustomerList = this.filterCustomerList.bind(this);
    }

    componentDidMount() {
        this.setState({
            customers: this.props.customers,
            filter: this.props.filter,
            filtered_customers: this.props.customers,
        });
    }

    // filters customer list on
    filterCustomerList() {
        if (this.state.filter === 'none') {
            // change from no filter to only show members
            if (this.state.customers === undefined) {
                this.setState({
                    customers: this.props.customers,
                    filter: this.props.filter,
                });
                var filtered_customers = [];

                for (var i = 0; i < this.props.customers.length; i++) {
                    if (this.props.customers[i].member) {
                        filtered_customers.push(this.props.customers[i]);
                    }
                }

                this.setState({
                    filter: 'member',
                    filtered_customers: filtered_customers,
                });

                memberTitle1.innerHTML = 'Member Status [members]';
                memberTitle2.innerHTML = 'Member Status [members]';
                return;
            }

            var filtered_customers = [];
            for (var i = 0; i < this.state.customers.length; i++) {
                if (this.state.customers[i].member) {
                    filtered_customers.push(this.state.customers[i]);
                }
            }

            this.setState({
                filter: 'member',
                filtered_customers: filtered_customers,
            });

            memberTitle1.innerHTML = 'Member Status [members]';
            memberTitle2.innerHTML = 'Member Status [members]';
        } else if (this.state.filter === 'member') {
            // change from only show members to only show non-members
            if (this.state.customers === undefined) {
                this.setState({
                    customers: this.props.customers,
                    filter: this.props.filter,
                });
            }

            var filtered_customers = [];
            for (var i = 0; i < this.state.customers.length; i++) {
                if (!this.state.customers[i].member) {
                    filtered_customers.push(this.state.customers[i]);
                }
            }

            this.setState({
                filter: 'no member',
                filtered_customers: filtered_customers,
            });

            memberTitle1.innerHTML = 'Member Status [non-members]';
            memberTitle2.innerHTML = 'Member Status [non-members]';
        } else {
            // change from only show non-members to show all
            if (this.state.customers === undefined) {
                this.setState({
                    customers: this.props.customers,
                    filter: this.props.filter,
                });
            }

            this.setState({
                filter: 'none',
                filtered_customers: this.state.customers,
            });

            memberTitle1.innerHTML = 'Member Status [all]';
            memberTitle2.innerHTML = 'Member Status [all]';
        }
        return;
    }

    render() {
        return (
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
                            onClick={this.filterCustomerList}
                        >
                            <Tooltip label='Filter on member status'>
                                Member Status [all]
                            </Tooltip>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.state.filtered_customers ? (
                        this.state.filtered_customers.map((cust) => (
                            <Tr key={cust.customer_id}>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.customer_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.first_name + ' ' + cust.last_name}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.email_address}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.address}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.phone}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.member ? (
                                            <CheckIcon />
                                        ) : (
                                            <SmallCloseIcon />
                                        )}
                                    </Link>
                                </Td>
                            </Tr>
                        ))
                    ) : this.props.customers ? (
                        this.props.customers.map((cust) => (
                            <Tr key={cust.customer_id}>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.customer_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.first_name + ' ' + cust.last_name}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.email_address}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.address}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.phone}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
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
                            <Td>Loading...</Td>
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
                            onClick={this.filterCustomerList}
                        >
                            <Tooltip label='Filter on member status'>
                                Member Status [all]
                            </Tooltip>
                        </Th>
                    </Tr>
                </Tfoot>
            </Table>
        );
    }
}

export default class CustomerAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: undefined,
            filtered_customers: undefined,
            filter: 'none',
        };
    }

    componentDidMount() {
        this.getCustomerList();
    }

    getCustomerList() {
        fetch('/api/get-customer')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    customers: data,
                    filtered_customers: data,
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
                                <Heading>All Customers</Heading>
                                <CustomerTable
                                    customers={this.state.filtered_customers}
                                    filter={this.state.filter}
                                />
                                <Link to='/customer/'>
                                    <Button>Cancel</Button>
                                </Link>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
