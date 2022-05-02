import React, { Component } from 'react';
import {
    HStack,
    Text,
    Flex,
    chakra,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    background,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <chakra.header id='header' bg='brand.600'>
                <Flex
                    w='100%'
                    px='6'
                    py='3'
                    align='center'
                    justify='space-between'
                >
                    <Link to='/'>
                        <Text
                            fontSize={['2xl', '2xl']}
                            fontWeight='semibold'
                            color='brand.200'
                            className='Nav-Header'
                        >
                            Inventory Manager
                        </Text>
                    </Link>

                    <HStack as='nav' spacing='4' color='brand.200'>
                        <Link to='/item'>
                            <Button variant='link' color='brand.200'>
                                Inventory
                            </Button>
                        </Link>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                bg='background.200'
                                _hover={{ bg: 'brand.900' }}
                                _expanded={{
                                    bg: 'brand.200',
                                    color: 'brand.900',
                                }}
                            >
                                Data Categories
                            </MenuButton>
                            <MenuList
                                bg='brand.600'
                                color='brand.100'
                                borderWidth='0px'
                            >
                                <Link to='/coupon'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Coupons
                                    </MenuItem>
                                </Link>
                                <Link to='/customer'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Customers
                                    </MenuItem>
                                </Link>
                                <Link to='/department'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Departments
                                    </MenuItem>
                                </Link>
                                <Link to='/employee'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Employees
                                    </MenuItem>
                                </Link>
                                <Link to='/item'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Items
                                    </MenuItem>
                                </Link>
                                <Link to='/itemcategory'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Item Categories
                                    </MenuItem>
                                </Link>
                                <Link to='/store'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Stores
                                    </MenuItem>
                                </Link>
                                <Link to='/transaction'>
                                    <MenuItem _hover={{ color: 'brand.900' }}>
                                        Transactions
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                        <Link to='/login'>
                            <Button
                                bg='brand.200'
                                color='brand.900'
                                rightIcon={<ArrowForwardIcon />}
                            >
                                Get Started
                            </Button>
                        </Link>
                    </HStack>
                </Flex>
            </chakra.header>
        );
    }
}
