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

class ItemCategoryTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemCategories: undefined,
            filter: 'none',
        };

        this.filterItemCategoryList = this.filterItemCategoryList.bind(this);
    }

    componentDidMount() {
        this.setState({
            itemCategories: this.props.itemCategories,
            filter: this.props.filter,
            filtered_itemCategories: this.props.itemCategories,
        });
    }

    // filters customer list on
    filterItemCategoryList() {
        //if (this.state.filter === 'none') {
        //     // change from no filter to only show members
        //     if (this.state.itemCategories === undefined) {
        //         this.setState({
        //             stores: this.props.itemCategories,
        //             filter: this.props.filter,
        //         });
        //         var filtered_stores = [];

        //         // for (var i = 0; i < this.props.stores.length; i++) {
        //         //     if (this.props.stores[i].member) {
        //         //         filtered_stores.push(this.props.stores[i]);
        //         //     }
        //         // }

        //         // this.setState({
        //         //     filter: 'member',
        //         //     filtered_customers: filtered_customers,
        //         // });

        //         // memberTitle1.innerHTML = 'Member Status [members]';
        //         // memberTitle2.innerHTML = 'Member Status [members]';
        //         itemCategoryTitle1.innerHTML = 'Member Status [members]';
        //         itemCategoryTitle2.innerHTML = 'Member Status [members]';
        //         return;
        //     }

        //     var filtered_customers = [];
        //     for (var i = 0; i < this.state.customers.length; i++) {
        //         if (this.state.customers[i].member) {
        //             filtered_customers.push(this.state.customers[i]);
        //         }
        //     }

        //     this.setState({
        //         filter: 'member',
        //         filtered_customers: filtered_customers,
        //     });

        //     memberTitle1.innerHTML = 'Member Status [members]';
        //     memberTitle2.innerHTML = 'Member Status [members]';
        // } else if (this.state.filter === 'member') {
        //     // change from only show members to only show non-members
        //     if (this.state.itemCategories === undefined) {
        //         this.setState({
        //             itemCategories: this.props.itemCategories,
        //             filter: this.props.filter,
        //         });
        //     }

        //     var filtered_customers = [];
        //     for (var i = 0; i < this.state.customers.length; i++) {
        //         if (!this.state.customers[i].member) {
        //             filtered_customers.push(this.state.customers[i]);
        //         }
        //     }

        //     this.setState({
        //         filter: 'no member',
        //         filtered_customers: filtered_customers,
        //     });

        //     memberTitle1.innerHTML = 'Member Status [non-members]';
        //     memberTitle2.innerHTML = 'Member Status [non-members]';
        // } else {
        //     // change from only show non-members to show all
        if (this.state.itemCategories === undefined) {
            this.setState({
                itemCategories: this.props.itemCategories,
                filter: this.props.filter,
            });
        }

        this.setState({
            filter: 'none',
            filtered_itemCategories: this.state.itemCategories,
        });

        itemCategoryTitle1.innerHTML = 'Item Category [all]';
        itemCategoryTitle2.innerHTML = 'Item Category [all]';
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
                            id='itemCategoryTitle1'
                            isNumeric
                            cursor='pointer'
                            onClick={this.filterItemCategoryList}
                        >
                            {/* <Tooltip label='Filter on member status'>
                                Member Status [all]
                            </Tooltip> */}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.state.filtered_itemCategories ? (
                        this.state.filtered_itemCategories.map((categ) => (
                            <Tr key={categ.category_id}>
                                <Td isNumeric>
                                    <Link to={`/itemCategory/${categ.category_id}`}>
                                        {categ.category_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/itemCategory/${categ.category_id}`}>
                                        {categ.category_name}
                                    </Link>
                                </Td>
                                {/* <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.member ? (
                                            <CheckIcon />
                                        ) : (
                                            <SmallCloseIcon />
                                        )}
                                    </Link>
                                </Td> */}
                            </Tr>
                        ))
                    ) : this.props.itemCategories ? (
                        this.props.itemCategories.map((categ) => (
                            <Tr key={categ.category_id}>
                                <Td isNumeric>
                                    <Link to={`/itemCategory/${categ.category_id}`}>
                                        {categ.category_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/itemCategory/${categ.category_id}`}>
                                        {categ.category_name}
                                    </Link>
                                </Td>
                                {/* <Td isNumeric>
                                    <Link to={`/customer/${cust.customer_id}`}>
                                        {cust.member ? (
                                            <CheckIcon />
                                        ) : (
                                            <SmallCloseIcon />
                                        )}
                                    </Link>
                                </Td> */}
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
                        <Th>Category</Th>
                        <Th
                            id='itemCategoryTitle2'
                            isNumeric
                            cursor='pointer'
                            onClick={this.filterItemCategoryList}
                        >
                            {/* <Tooltip label='Filter on member status'>
                                Member Status [all]
                            </Tooltip> */}
                        </Th>
                    </Tr>
                </Tfoot>
            </Table>
        );
    }
}

export default class ItemCategoryAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemCategories: undefined,
            filtered_itemCategories: undefined,
            filter: 'none',
        };
    }

    componentDidMount() {
        this.getItemCategoryList();
    }

    getItemCategoryList() {
        fetch('/api/get-itemCategory')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    itemCategories: data,
                    filtered_itemCategories: data,
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
                                <Heading>All Item Categories</Heading>
                                <ItemCategoryTable
                                    itemCategories={this.state.filtered_itemCategories}
                                    filter={this.state.filter}
                                />
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
