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
            store_name: '',
            name_err: false,
            success: '',
            failure: '',
            stores: undefined,
        };

        this.handleIDExistingChange = this.handleIDExistingChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
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

        var stor_name;
        for (let i = 0; i < this.state.stores.length; i++) {
            if (this.state.stores[i].store_id === e.target.value) {
                stor_name = this.state.stores[i].store_name;
                break;
            }
        }

        new_stor_id.value = e.target.value;
        store_name.value = stor_name;

        this.setState({
            existing_stor_id: e.target.value,
            new_stor_id: e.target.value,
            store_name: stor_name,
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

    handleNameChange(e) {
        this.setState({
            store_name: e.target.value,
            name_err: false,
            success: '',
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

        if (this.state.store_name.length == 0) {
            this.setState({
                name_err: true,
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
                store_name: this.state.store_name,
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

        if (this.state.store_name.length == 0) {
            this.setState({
                name_err: true,
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
                store_name: this.state.store_name,
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
                    store_name: '',
                    id_err: false,
                    success: 'Store deleted successfully.',
                    failure: '',
                });
                new_stor_id.value = '';
                store_name.value = '';
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
                                            this.state.stores.map(
                                                (stor) => (
                                                    <option
                                                        key={stor.store_id}
                                                        value={
                                                            stor.store_id
                                                        }
                                                    >
                                                        {stor.store_id}
                                                    </option>
                                                )
                                            )
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
                                        placeholder='AMZN'
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
                                <FormControl isInvalid={this.state.name_err}>
                                    <FormLabel htmlFor='store_name'>
                                        Store Name
                                    </FormLabel>
                                    <Input
                                        id='store_name'
                                        placeholder='Amazon'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        isDisabled={this.state.disabled}
                                        focusBorderColor='brand.200'
                                        onChange={this.handleNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Store Name is required.
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
