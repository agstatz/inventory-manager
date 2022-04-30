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

export default class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: null,
            sortBy: null
        };

        this.handleSortByChange = this.handleSortByChange.bind(this);
    }

    handleSortByChange(){
        if (e.target.value === '') {
            return;
        }
    }

    componentDidMount() {
        this.getTransactionList();
    }

    getTransactionList() {
        fetch('/api/get-transaction')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    transactions: data,
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
                                <Heading>Transactions</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Transaction ID</Th>
                                            <Th>Transaction Date</Th>
                                            <Th>Transaction Amount</Th>
                                            <Th>Customer ID</Th>
                                            <Th>Coupon ID</Th>
                                            <Th>Store ID</Th>
                                            <Th>Employee ID</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.transactions ? (
                                            this.state.transactions.map(
                                                (transaction) => (
                                                    <Tr
                                                        key={transaction.transaction_id}
                                                    >
                                                        <Td>
                                                            {transaction.transaction_id}
                                                        </Td>
                                                        <Td>
                                                            {transaction.transaction_date}
                                                        </Td>
                                                        <Td>
                                                            {transaction.total}
                                                        </Td>
                                                        <Td>
                                                            {transaction.customer_id}
                                                        </Td>
                                                        <Td>
                                                            {transaction.coupon_id}
                                                        </Td>
                                                        <Td>
                                                            {transaction.store_id}
                                                        </Td>
                                                        <Td>
                                                            {transaction.employee_id}
                                                        </Td>
                                                    </Tr>
                                                )
                                            )
                                        ) : (
                                            <Tr>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Transaction ID</Th>
                                            <Th>Transaction Date</Th>
                                            <Th>Transaction Amount</Th>
                                            <Th>Customer ID</Th>
                                            <Th>Coupon ID</Th>
                                            <Th>Store ID</Th>
                                            <Th>Employee ID</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <HStack spacing={2} mt={2}>
                                    <Link to='/transaction/create'>
                                        <Button>Add a transaction</Button>
                                    </Link>
                                    <Link to='/transaction/edit'>
                                        <Button>
                                            Modify an existing transaction
                                        </Button>
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
