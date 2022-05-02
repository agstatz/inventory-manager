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
    InputGroup,
    InputLeftElement,
    Select,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            existing_item_id: '',
            items: [],

            new_item_id: '',
            id_err: false,

            item_name: '',
            name_err: false,
            
            price: '',        
            price_err: false,
            
            quantity: '',
            quantity_err: false,

            category_id: '',
            category_err: '',
            categories: [],
            
            store_id: '',
            store_err: '',
            stores: [],
            
            success: '',
            failure: '',

        }

        this.handleExistingItemIdChange = this.handleExistingItemIdChange.bind(this);
        this.handleNewItemIdChange = this.handleNewItemIdChange.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        fetch('/api/get-item')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                items: data,
            });
        });

        fetch('/api/get-store')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                stores: data,
            });
        });

        fetch('/api/get-itemcategory')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                categories: data,
            });
        });

    }

    handleExistingItemIdChange(event) {
        if (event.target.value === '') {
            this.setState({
                existing_item_id: event.target.value,
                new_item_id: event.target.value,
            });
            return;
        }
    }

    handleNewItemIdChange(event) {
        this.setState({
            new_item_id: event.target.value,
            id_err: false,
        });
    }

    handleItemNameChange(event) {
        this.setState({
            item_name: event.target.value,
            name_err: false,
        });
    }

    handlePriceChange(event) {
        this.setState({
            price: event.target.value,
            price_err: false,
        });
    }

    handleQuantityChange(event) {
        this.setState({
            quantity: event.target.value,
            quantity_err: false,
        });
    }

    handleCategoryChange(event) {
        this.setState({
            category_id: event.target.value,
            category_err: false,
        });
    }

    handleStoreChange(event) {
        this.setState({
            store_id: event.target.value,
            store_err: false,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            success: '',
            failure: '',
        });

        const {
            existing_item_id,
            new_item_id,
            item_name,
            price,
            quantity,
            category_id,
            store_id,
        } = this.state;

        if (existing_item_id === '') {
            this.setState({
                id_err: true,
            });
            return;
        }

        if (item_name === '') {
            this.setState({
                name_err: true,
            });
            return;
        }

        if (price === '') {
            this.setState({
                price_err: true,
            });
            return;
        }

        if (quantity === '') {
            this.setState({
                quantity_err: true,
            });
            return;
        }

        if (category_id === '') {
            this.setState({
                category_err: true,
            });
            return;
        }

        if (store_id === '') {
            this.setState({
                store_err: true,
            });
            return;
        }

        const data = {
            existing_item_id,
            new_item_id,
            item_name,
            price,
            quantity,
            category_id,
            store_id,
        };

        fetch('/api/edit-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                this.setState({
                    success: data.success,
                });
            } else {
                this.setState({
                    failure: data.failure,
                });
            }
        });
    }

    render(){
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
                                <Heading>Edit Item</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='existing_item_id'>
                                        Select an Item ID
                                    </FormLabel>
                                    <Select
                                        id='existing_item_id'
                                        placeholder='Select Item ID'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleExistingItemIdChange}
                                    >
                                        {this.state.items ? (
                                            this.state.items.map(
                                                (item) => (
                                                    <option
                                                        key={item.item_id}
                                                        value={
                                                            item.item_id
                                                        }
                                                    >
                                                        {item.item_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No items to display
                                            </option>
                                        )}
                                    </Select>
                                    <br />
                                    <FormLabel htmlFor='new_item_id'>
                                        New Item ID
                                    </FormLabel>
                                    <Input
                                        id='new_item_id'
                                        placeholder='12345'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleNewItemIdChange}
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
                                <br />
                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit Changes
                                    </Button>
                                    
                                    <Link to='/item/'>
                                        <Button type='cancel'>Cancel</Button>
                                    </Link>
                                </HStack>
                                {this.state.success.length > 0 ? (
                                    <Alert
                                        status='success'
                                        borderRadius='5px'
                                        variant='subtle'
                                    >
                                        <AlertIcon />
                                        {this.state.success}
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