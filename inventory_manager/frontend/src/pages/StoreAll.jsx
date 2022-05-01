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

class StoreTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: undefined,
            filter: 'none',
        };

        this.filterStoreList = this.filterStoreList.bind(this);
    }

    componentDidMount() {
        this.setState({
            stores: this.props.stores,
            filter: this.props.filter,
            filtered_stores: this.props.stores,
        });
    }

    // filters customer list on
    filterStoreList() {
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
        if (this.state.stores === undefined) {
            this.setState({
                stores: this.props.stores,
                filter: this.props.filter,
            });
        }

        this.setState({
            filter: 'none',
            filtered_stores: this.state.stores,
        });

        storeTitle1.innerHTML = 'Store [all]';
        storeTitle2.innerHTML = 'Store [all]';
        return;
    }

    render() {
        return (
            <Table size='md'>
                <Thead>
                    <Tr>
                        <Th isNumeric>ID</Th>
                        <Th>Store Name</Th>
                        <Th
                            id='storeTitle1'
                            isNumeric
                            cursor='pointer'
                            onClick={this.filterStoreList}
                        >
                            {/* <Tooltip label='Filter on member status'>
                                Member Status [all]
                            </Tooltip> */}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.state.filtered_stores ? (
                        this.state.filtered_stores.map((stor) => (
                            <Tr key={stor.store_id}>
                                <Td isNumeric>
                                    <Link to={`/store/${stor.store_id}`}>
                                        {stor.store_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/store/${stor.store_id}`}>
                                        {stor.store_name}
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
                    ) : this.props.stores ? (
                        this.props.stores.map((stor) => (
                            <Tr key={stor.store_id}>
                                <Td isNumeric>
                                    <Link to={`/store/${stor.store_id}`}>
                                        {stor.store_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/store/${stor.store_id}`}>
                                        {stor.store_name}
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
                        <Th>Store Name</Th>
                        <Th
                            id='storeTitle2'
                            isNumeric
                            cursor='pointer'
                            onClick={this.filterStoreList}
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

export default class StoreAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: undefined,
            filtered_stores: undefined,
            filter: 'none',
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
                    filtered_stores: data,
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
                                <Heading>All Stores</Heading>
                                <StoreTable
                                    stores={this.state.filtered_stores}
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
