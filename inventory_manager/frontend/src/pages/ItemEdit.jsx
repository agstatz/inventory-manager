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
            id_err: false,
            items: [],
            
            quantity: '',
            quantity_err: false,
            
            success: '',
            failure: '',

        }

        this.handleExistingItemIdChange = this.handleExistingItemIdChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
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

    }

    handleExistingItemIdChange(event) {

        this.setState({
            existing_item_id: event.target.value,
            id_err: false,
        });
        
    }


    handleQuantityChange(event) {
        this.setState({
            quantity: event.target.value,
            quantity_err: false,
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
            quantity,
        } = this.state;

        if (existing_item_id === '') {
            this.setState({
                id_err: true,
            });
            return;
        }

        if (quantity === '') {
            this.setState({
                quantity_err: true,
            });
            return;
        }


        const data = {
            item_id: existing_item_id,
            quantity,
        };

        console.log(data)
        fetch('/api/edit-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                success: 'Successfully restocked item',
            });
            
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
                                <Heading>Restock Item</Heading>
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
                                    <FormErrorMessage>
                                        Item is required.
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
                                {this.state.failure ? (
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