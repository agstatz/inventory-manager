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
    Select
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: null,
            totalSale: 0, 
            sortBy: "Default",
            restriction:10
        };

        this.handleCalculate = this.handleCalculate.bind(this)
        this.handleSortByChange = this.handleSortByChange.bind(this)
        this.handleRestrictionChange = this.handleRestrictionChange.bind(this)
        this.restrictionList = [10,25,100]
        this.sortByList = [
            "Default","Transaction ID","Transaction Date","Employee ID","No. of Items","Coupon ID"
        ]
        
    }

    handleCalculate(e){
        e.preventDefault()

        fetch('/api/get-calc')
            .then((response)=>response.json())
            .then((data)=>{
                let amount = data.amount.toString()
                if (amount.charAt(amount.length-2) == "."){
                    amount += "0"
                } else if (amount.indexOf(".") == -1){
                    amount += ".00"
                }
                this.setState({
                    totalSale:amount
                })
            })
    }
    
    handleSortByChange(e){
        if (e.target.value === '') {
            return;
        }

        this.setState({
            sortBy: e.target.value
        })
    }

    handleRestrictionChange(e){
        if (e.target.value === '') {
            return;
        }
        this.setState({
            restriction: Number(e.target.value)
        })
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.restriction != this.state.restriction || 
            prevState.sortBy != this.state.sortBy){
                this.getTransactionList()
            }
    }

    componentDidMount() {
        this.getTransactionList();
    }

    getTransactionList() {

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sortBy: this.state.sortBy,
                restriction: this.state.restriction
            }),
        };
        // Get request for the page but with details for sorting and restrictions
        fetch('/api/patch-transaction',requestOptions)
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
                                <HStack spacing={4} mt={2}>
                                    <b>Sort by</b>
                                    <Select
                                        id='sortby_id'
                                        placeholder=""
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        size="sm"
                                        onChange={this.handleSortByChange}
                                    >
                                        {this.sortByList.map(
                                            (item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                    <b>No. of Transactions</b>
                                    <Select
                                        id='restriction_id'
                                        placeholder=""
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        size="sm"
                                        onChange={this.handleRestrictionChange}
                                    >
                                        {this.restrictionList.map(
                                            (item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </HStack>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Date</Th>
                                            <Th>Amount</Th>
                                            <Th>Customer ID</Th>
                                            <Th>Coupon ID</Th>
                                            <Th>Store ID</Th>
                                            <Th>Employee ID</Th>
                                            <Th>Item IDs</Th>
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
                                                            ${transaction.total}
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
                                                        <Td>
                                                            {transaction.items_id}
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
                                            <Th>ID</Th>
                                            <Th>Date</Th>
                                            <Th>Amount</Th>
                                            <Th>Customer ID</Th>
                                            <Th>Coupon ID</Th>
                                            <Th>Store ID</Th>
                                            <Th>Employee ID</Th>
                                            <Th>Item IDs</Th>
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
                                <b>Total Sale: ${this.state.totalSale}</b>
                                <Button onClick={this.handleCalculate}>
                                    Calculate Sale
                                </Button>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
