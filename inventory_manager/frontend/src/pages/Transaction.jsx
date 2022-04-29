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
            transactions: undefined,
        };
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
                                            <Th>Transaction Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.transactions ? (
                                            this.state.transactions.map(
                                                (dept) => (
                                                    <Tr
                                                        key={dept.transactions_id}
                                                    >
                                                        <Td>
                                                            {dept.transactions_id}
                                                        </Td>
                                                        <Td>
                                                            {
                                                                dept.transactions_name
                                                            }
                                                        </Td>
                                                    </Tr>
                                                )
                                            )
                                        ) : (
                                            <Tr>
                                                <Td>Loading...</Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Transaction ID</Th>
                                            <Th>Transaction Name</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <HStack spacing={2} mt={2}>
                                    <Link to='/transactions/create'>
                                        <Button>Add a transactions</Button>
                                    </Link>
                                    <Link to='/transactions/edit'>
                                        <Button>
                                            Modify an existing transactions
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
