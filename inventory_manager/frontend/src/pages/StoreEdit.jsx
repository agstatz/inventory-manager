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
    Select,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

const MAX_ID_LENGTH = 5;
const MAX_NAME_LENGTH = 40;

export default class StoreEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            existing_stor_id: '',
            disabled: true,
            new_stor_id: '',
            id_err: false,
            store_address: '',
            address_err: false,
            store_city: '',
            city_err: false,
            store_country: '',
            country_err: false,
            success: '',
            failure: '',
            stores: undefined,
        };

        this.handleIDExistingChange = this.handleIDExistingChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                });
            });
    }

    handleIDExistingChange(e) {
        if (e.target.value === '') {
            this.setState({
                existing_stor_id: e.target.value,
                new_stor_id: e.target.value,
                disabled: true,
                id_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        var stor_address;
        var stor_city;
        var stor_country;
        for (let i = 0; i < this.state.stores.length; i++) {
            if (this.state.stores[i].store_id === e.target.value) {
                console.log(this.state.stores[i]);
                stor_address = this.state.stores[i].store_address;
                stor_city = this.state.stores[i].store_city;
                stor_country = this.state.stores[i].store_country;
                break;
            }
        }

        new_stor_id.value = e.target.value;
        store_address.value = stor_address;
        store_city.value = stor_city;
        store_country.value = stor_country;

        this.setState({
            existing_stor_id: e.target.value,
            new_stor_id: e.target.value,
            store_address: stor_address,
            store_city: stor_city,
            store_country: stor_country,
            disabled: false,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleIDChange(e) {
        this.setState({
            new_stor_id: e.target.value,
            id_err: false,
            success: '',
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
        if (this.state.new_stor_id.length == 0) {
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
                store_id: this.state.new_stor_id,
                store_address: this.state.store_address,
                store_city: this.state.store_city,
                store_country: this.state.store_country,
            }),
        };
        fetch('/api/post-store', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: 'Store updated successfully.',
                });
            });
    }

    handleDelete() {
        var isError = false;
        if (this.state.new_stor_id.length == 0) {
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
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                store_id: this.state.new_stor_id,
                store_address: this.state.store_address,
                store_city: this.state.store_city,
                store_country: this.state.store_country,
            }),
        };
        fetch('/api/delete-store', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: true,
                    disabled: true,
                    existing_stor_id: '',
                    new_stor_id: '',
                    store_address: '',
                    id_err: false,
                    success: 'Store deleted successfully.',
                    failure: '',
                });
                new_stor_id.value = '';
                store_address.value = '';
                existing_stor_id.value = '';
                this.getStoreList();
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
                                <Heading>Edit Store</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='existing_stor_id'>
                                        Select a store
                                    </FormLabel>
                                    <Select
                                        id='existing_stor_id'
                                        placeholder='Select store'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleIDExistingChange}
                                    >
                                        {this.state.stores ? (
                                            this.state.stores.map((stor) => (
                                                <option
                                                    key={stor.store_id}
                                                    value={stor.store_id}
                                                >
                                                    {stor.store_id}
                                                </option>
                                            ))
                                        ) : (
                                            <option value='empty'>
                                                No stores to display
                                            </option>
                                        )}
                                    </Select>
                                    <br />
                                    <FormLabel htmlFor='new_stor_id'>
                                        New Store ID
                                    </FormLabel>
                                    <Input
                                        id='new_stor_id'
                                        placeholder='00002'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        isReadOnly={true}
                                        isDisabled={this.state.disabled}
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
                                        id='store_address'
                                        placeholder='150 Stadium Ave'
                                        variant='outline'
                                        isDisabled={this.state.disabled}
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
                                        id='store_city'
                                        placeholder='West Lafayette'
                                        variant='outline'
                                        isDisabled={this.state.disabled}
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
                                        id='store_country'
                                        placeholder='United States of America'
                                        variant='outline'
                                        isDisabled={this.state.disabled}
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleCountryChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store Country is required.
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
                                    <Button
                                        type='submit'
                                        onClick={this.handleDelete}
                                    >
                                        Delete Store
                                    </Button>
                                    <Link to='/store/'>
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
