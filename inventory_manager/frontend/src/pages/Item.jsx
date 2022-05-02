import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
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

export default class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        fetch('/api/get-item')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    items: data,
                });

                console.log(this.state)
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
                    height='100%'
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
                                <Heading>Items</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Item ID</Th>
                                            <Th>Name</Th>
                                            <Th>Price</Th>
                                            <Th>Quantity</Th>
                                            <Th
                                            id='item_id_header'
                                            cursor='pointer'
                                            onClick={() => {
                                                console.log('here')
                                                this.setState({
                                                    items: this.state.items.sort((a, b) => {
                                                        if (a.category_id < b.category_id) {
                                                            return -1;
                                                        }
                                                        if (a.category_id > b.category_id) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    }),
                                                });
                                                console.log(this.state.items)
                                            }}
                                            >Category</Th>
                                            <Th>Store ID</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.items ? (
                                            this.state.items.map((item) => (
                                                <Tr key={item.item_id}>
                                                    <Td>{item.item_id}</Td>
                                                    <Td>{item.name}</Td>
                                                    <Td>${item.price}</Td>
                                                    <Td>{item.quantity}</Td>
                                                    <Td>{item.category_id}</Td>

                                                    <Td>{item.store_id}</Td>
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
                                </Table>
                                <Box></Box>
                                <Link to='/item/create'>
                                    <Button>Add an item</Button>
                                </Link>
                                <Link to='/item/edit'>
                                    <Button>Modify an existing item</Button>
                                </Link>
                                <Link to='/'>
                                    <Button>Back to Home</Button>
                                </Link>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
