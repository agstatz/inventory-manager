import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Alert,
    AlertIcon,
    HStack,
    Input,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class ItemCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: '',
            id_err: false,
            item_name: '',
            name_err: false,
            item_quantity: '',
            quantity_err: false,
            item_price: '',
            price_err: false,

            item_category: '',
            category_err: false,

            success: false,
            failure: '',
        }

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIDChange(e) {
        this.setState({
            item_id: e.target.value,
            id_err: false,
            success: false,
            failure: '',
        });
    }

    handleNameChange(e) {
        this.setState({
            item_name: e.target.value,
            name_err: false,
            success: false,
            failure: '',
        });
    }

    handleQuantityChange(e) {
        this.setState({
            item_quantity: e.target.value,
            quantity_err: false,
            success: false,
            failure: '',
        });
    }

    handlePriceChange(e) {
        this.setState({
            item_price: e.target.value,
            price_err: false,
            success: false,
            failure: '',
        });
    }

    handleCategoryChange(e) {
        this.setState({
            item_category: e.target.value,
            category_err: false,
            success: false,
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.item_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.item_name.length == 0) {
            this.setState({
                name_err: true,
            });
            isError = true;
        }

        if (this.state.item_quantity <= 0) {
            this.setState({
                quantity_err: true,
            });
            isError = true;
        }

        if (this.state.item_price  <= 0) {
            this.setState({
                price_err: true,
            });
            isError = true;
        }

        if (this.state.item_category.length == 0) {
            this.setState({
                category_err: true,
            });
            isError = true;
        }

        if (isError) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                item_id: this.state.item_id,
                item_name: this.state.item_name,
                item_quantity: this.state.item_quantity,
                item_price: this.state.item_price,
                item_category: this.state.item_category,
            }),
        };

        fetch('/api/post-item', requestOptions)
            .then(response => {
                console.log(requestOptions)
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    success: true,
                });
            })
            .catch(error => {
                this.setState({
                    failure: error.message,
                });
            });
    }

    render() {
        return (
            <Box>
                <Navbar />
                <Box
                    width='100%'
                    bg='brand.300'
                    color='brand.600'
                    height='100%'
                    minHeight='100vh'
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
                                <Heading>Create Item</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='item_id'>
                                        Item ID
                                    </FormLabel>
                                    <Input
                                        id='item_id'
                                        placeholder='10OFF'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                    />
                                    <FormErrorMessage>
                                        Item ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.name_err}>
                                    <FormLabel htmlFor='item_name'>
                                        Item Name
                                    </FormLabel>
                                    <Input
                                        id='item_name'
                                        placeholder='Xbox 360'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleNameChange}
                                    />
                                    <FormErrorMessage>
                                        Name is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.quantity_err}>
                                    <FormLabel htmlFor='item_quantity'>
                                        Quantity
                                    </FormLabel>
                                    <Input
                                        id='item_quantity'
                                        placeholder='10'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleQuantityChange}
                                    />
                                    <FormErrorMessage>
                                        Quantity is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.price_err}>
                                    <FormLabel htmlFor='item_price'>
                                        Price
                                    </FormLabel>
                                    <Input
                                        id='item_price'
                                        placeholder='$10.00'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handlePriceChange}
                                    />
                                    <FormErrorMessage>
                                        Price is required.
                                    </FormErrorMessage>
                                </FormControl>

                               <FormControl>
                                    <FormLabel htmlFor='item_category'>
                                        Category
                                    </FormLabel>
                                    <Input
                                        id='item_category'
                                        placeholder='Toys and Games'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleCategoryChange}
                                    />
                                    <FormErrorMessage>
                                        Category is required.
                                    </FormErrorMessage>
                                </FormControl>

                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <Link to='/item/'>
                                        <Button type='cancel'>Cancel</Button>
                                    </Link>
                                </HStack>
                                {this.state.success ? (
                                    <Alert
                                        status='success'
                                        borderRadius='5px'
                                        variant='subtle'
                                    >
                                        <AlertIcon />
                                        Item created successfully.
                                    </Alert>
                                ) : (
                                    <></>
                                )}
                                {this.state.failure.length > 0 ? (
                                    <Alert
                                        status='error'
                                        borderRadius='5px'
                                        variant='subtle'
                                    >
                                        <AlertIcon />
                                        {this.state.failure}
                                    </Alert>
                                ) : (
                                    <></>
                                )}
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </Box>
        );

       
    }
}