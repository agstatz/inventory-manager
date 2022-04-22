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

export default class ItemCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemcategories: undefined,
        };
    }

    componentDidMount() {
        this.getItemCategoryList();
    }

    getItemCategoryList() {
        fetch('/api/get-itemcategory')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    itemcategories: data,
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
                                <Heading>Item Categories</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Item Category ID</Th>
                                            <Th>Item Category Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.itemcategories ? (
                                            this.state.itemcategories.map(
                                                (categ) => (
                                                    <Tr
                                                        key={categ.category_id}
                                                    >
                                                        <Td>
                                                            {categ.category_id}
                                                        </Td>
                                                        <Td>
                                                            {
                                                                categ.category_name
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
                                            <Th>Item Category ID</Th>
                                            <Th>Item Category Name</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <HStack spacing={2} mt={2}>
                                    <Link to='/itemcategory/create'>
                                        <Button>Add a item category</Button>
                                    </Link>
                                    <Link to='/itemcategory/edit'>
                                        <Button>
                                            Modify an existing item category
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
