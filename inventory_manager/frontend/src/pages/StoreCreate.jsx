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

const MAX_ID_LENGTH = 5;
const MAX_NAME_LENGTH = 40;

export default class StoreCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_id: '',
            id_err: false,
            store_address: '',
            address_err: false,
            store_city: '',
            city_err: false,
            store_country: '',
            country_err: false,
            success: false,
            failure: '',
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIDChange(e) {
        this.setState({
            store_id: e.target.value,
            id_err: false,
            success: false,
            failure: '',
        });
    }

    handleAddressChange(e) {
        this.setState({
            store_address: e.target.value,
            address_err: false,
            success: false,
            failure: '',
        });
    }

    handleCityChange(e) {
        this.setState({
            store_city: e.target.value,
            city_err: false,
            success: false,
            failure: '',
        });
    }

    handleCountryChange(e) {
        this.setState({
            store_country: e.target.value,
            country_err: false,
            success: false,
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.store_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.store_address.length == 0) {
            this.setState({
                address_err: true,
            });
            isError = true;
        }

        if (this.state.store_city.length == 0) {
            this.setState({
                city_err: true,
            });
            isError = true;
        }

        if (this.state.store_country.length == 0) {
            this.setState({
                country_err: true,
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
                store_id: this.state.store_id,
                store_address: this.state.store_address,
                store_city: this.state.store_city,
                store_country: this.state.store_country,
            }),
        };
        fetch('/api/store', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.store_id[0].includes('already exists.')) {
                    this.setState({
                        failure: data.store_id[0],
                    });
                } else if (data.store_id[0].includes('error')) {
                    this.setState({
                        failure: data.store_id[0],
                    });
                } else {
                    this.setState({
                        success: true,
                    });
                }
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
                                <Heading>Create Store</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='store_id'>
                                        Store ID
                                    </FormLabel>
                                    <Input
                                        id='store_id'
                                        placeholder='01024'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                        maxLength={MAX_ID_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.address_err}>
                                    <FormLabel htmlFor='store_id'>
                                        Store Address
                                    </FormLabel>
                                    <Input
                                        id='store_id'
                                        placeholder='150 Stadium Ave'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleAddressChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store Address is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.city_err}>
                                    <FormLabel htmlFor='store_id'>
                                        Store City
                                    </FormLabel>
                                    <Input
                                        id='store_id'
                                        placeholder='West Lafayette'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleCityChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store City is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.country_err}>
                                    <FormLabel htmlFor='store_id'>
                                        Store Country
                                    </FormLabel>
                                    <Input
                                        id='store_id'
                                        placeholder='United States of America'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleCountryChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store Country is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <Link to='/store/'>
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
                                        Store created successfully.
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
