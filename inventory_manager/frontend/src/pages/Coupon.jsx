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

export default class Coupon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coupons: undefined,
        };
    }

    componentDidMount() {
        this.getCoupons();
    }

    getCoupons() {
        fetch('/api/get-coupon')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    coupons: data,
                });
            });
    }

    render() {
        return (
            <>
                <Navbar />
                <Box width='100%' /*bg='brand.300'*/ color='brand.600'>
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
                                <Heading>Coupons</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Coupon ID</Th>
                                            <Th>Discount Rate</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.coupons ? (
                                            this.state.coupons.map((coupon) => (
                                                <Tr key={coupon.coupon_id}>
                                                    <Td>{coupon.coupon_id}</Td>
                                                    <Td>
                                                        {coupon.discount_rate}
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td>Loading...</Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Coupon ID</Th>
                                            <Th>Discount Rate</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <Link to='/coupon/create'>
                                    <Button>Add a coupon</Button>
                                </Link>
                                <Link to='/coupon/edit'>
                                    <Button>Modify an existing coupon</Button>
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
