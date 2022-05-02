import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Select,
    FormErrorMessage,
    Alert,
    AlertIcon,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class ItemCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: '',
            id_err: false,
            name: '',
            name_err: false,
            quantity: '',
            quantity_err: false,
            price: '',
            price_err: false,

            categories: null,
            category_id: '',
            category_err: false,

            stores: null,
            store_id: '',
            store_err: false,

            success: false,
            failure: '',
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        fetch('/api/get-itemcategory')
            .then((response) => response.json())
            .then((data) => {
                const null_category = {category_id: 'No item categories'}
                data.unshift(null_category);
                this.setState({
                    categories: data,
                });
            });

        fetch("/api/get-store")
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({
                    stores:data
                })
            })

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
            name: e.target.value,
            name_err: false,
            success: false,
            failure: '',
        });
    }

    handleQuantityChange(e) {
        this.setState({
            quantity: e.target.value,
            quantity_err: false,
            success: false,
            failure: '',
        });
    }

    handlePriceChange(e) {
        this.setState({
            price: e.target.value,
            price_err: false,
            success: false,
            failure: '',
        });
    }

    handleCategoryChange(e) {
        if (e.target.value === '') {
            this.setState({
                category_id: e.target.value,
                category_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            category_id: e.target.value,
            category_err: false,
            success: '',
            failure: '',
        });
    }

    handleStoreChange(e){
        if (e.target.value === '') {
            this.setState({
                store_id: e.target.value,
                store_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            store_id: e.target.value,
            store_err: false,
            success: '',
            failure: '',
        })
    }

    handleSubmit() {
        var isError = false;
        if (this.state.item_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.name.length == 0) {
            this.setState({
                name_err: true,
            });
            isError = true;
        }

        if (this.state.quantity <= 0) {
            this.setState({
                quantity_err: true,
            });
            isError = true;
        }

        if (this.state.price <= 0) {
            this.setState({
                price_err: true,
            });
            isError = true;
        }

        if (this.state.category_id.length == 0) {
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
                name: this.state.name,
                quantity: this.state.quantity,
                price: this.state.price,
                category_id: this.state.category_id,
                store_id: this.state.store_id,
            }),
        };

        fetch('/api/post-item', requestOptions)
            .then((response) => {
                console.log(requestOptions);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    success: true,
                });
            })
            .catch((error) => {
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
                                <Heading>Create Items</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='item_id'>
                                        Item ID
                                    </FormLabel>
                                    <Input
                                        id='item_id'
                                        placeholder='12345'
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
                                    <FormLabel htmlFor='name'>
                                        Item Name
                                    </FormLabel>
                                    <Input
                                        id='name'
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
                                <FormControl
                                    isInvalid={this.state.quantity_err}
                                >
                                    <FormLabel htmlFor='quantity'>
                                        Quantity
                                    </FormLabel>
                                    <Input
                                        id='quantity'
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
                                    <FormLabel htmlFor='price'>
                                        Price
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            id='price'
                                            placeholder='10.00'
                                            variant='outline'
                                            bg='white'
                                            my='auto'
                                            focusBorderColor='brand.200'
                                            onChange={this.handlePriceChange}
                                        />
                                    </InputGroup>

                                    <FormErrorMessage>
                                        Price is required.
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={this.state.category_err}>
                                    <FormLabel htmlFor='category_id'>
                                        Select item category
                                    </FormLabel>
                                    <Select
                                        id='category_id'
                                        placeholder=""
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleCategoryChange}
                                    >
                                        {this.state.categories ? (
                                            this.state.categories.map(
                                                (category) => (
                                                    <option
                                                        key={category.category_id}
                                                        value={
                                                            category.category_id
                                                        }
                                                    >
                                                        {category.category_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No item categories to display
                                            </option>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl isInvalid={this.state.store_err}>
                                    <FormLabel htmlFor='store_id'>
                                        Store
                                    </FormLabel>
                                    <Select
                                        id='store_id'
                                        placeholder='Select store'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleStoreChange}
                                    >
                                        {this.state.stores ? (
                                            this.state.stores.map(
                                                (store) => (
                                                    <option
                                                        key={store.store_id}
                                                        value={
                                                            store.store_id
                                                        }
                                                    >
                                                        {store.store_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No stores available
                                            </option>
                                        )}
                                    </Select>
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
