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

export default class ItemCategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            existing_categ_id: '',
            disabled: true,
            new_categ_id: '',
            id_err: false,
            category_name: '',
            name_err: false,
            success: '',
            failure: '',
            categories: undefined,
        };

        this.handleIDExistingChange = this.handleIDExistingChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getItemCategoryList();
    }

    getItemCategoryList() {
        fetch('/api/get-itemcategory')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    categories: data,
                });
            });
    }

    handleIDExistingChange(e) {
        if (e.target.value === '') {
            this.setState({
                existing_categ_id: e.target.value,
                new_categ_id: e.target.value,
                disabled: true,
                id_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        var categ_name;
        for (let i = 0; i < this.state.categories.length; i++) {
            if (this.state.categories[i].category_id === e.target.value) {
                categ_name = this.state.categories[i].category_name;
                break;
            }
        }

        new_categ_id.value = e.target.value;
        category_name.value = categ_name;

        this.setState({
            existing_categ_id: e.target.value,
            new_categ_id: e.target.value,
            category_name: categ_name,
            disabled: false,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleIDChange(e) {
        this.setState({
            new_categ_id: e.target.value,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleNameChange(e) {
        this.setState({
            category_name: e.target.value,
            name_err: false,
            success: '',
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.new_categ_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.category_name.length == 0) {
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
                category_id: this.state.new_categ_id,
                category_name: this.state.category_name,
            }),
        };
        fetch('/api/post-itemcategory', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: 'Item Category updated successfully.',
                });
            });
    }

    handleDelete() {
        var isError = false;
        if (this.state.new_categ_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.category_name.length == 0) {
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
                category_id: this.state.new_categ_id,
                category_name: this.state.category_name,
            }),
        };
        fetch('/api/delete-itemcategory', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: true,
                    disabled: true,
                    existing_categ_id: '',
                    new_categ_id: '',
                    category_name: '',
                    id_err: false,
                    success: 'Item Category deleted successfully.',
                    failure: '',
                });
                new_categ_id.value = '';
                category_name.value = '';
                existing_categ_id.value = '';
                this.getItemCategoryList();
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
                                <Heading>Edit Item Category</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='existing_categ_id'>
                                        Select an Item Category
                                    </FormLabel>
                                    <Select
                                        id='existing_categ_id'
                                        placeholder='Select Item Category'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleIDExistingChange}
                                    >
                                        {this.state.categories ? (
                                            this.state.categories.map(
                                                (categ) => (
                                                    <option
                                                        key={categ.category_id}
                                                        value={
                                                            categ.category_id
                                                        }
                                                    >
                                                        {categ.category_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No item categories to display
                                            </option>
                                        )}
                                    </Select>
                                    <br />
                                    <FormLabel htmlFor='new_categ_id'>
                                        New Item Category ID
                                    </FormLabel>
                                    <Input
                                        id='new_categ_id'
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
                                        Item Category ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.name_err}>
                                    <FormLabel htmlFor='category_name'>
                                        Item Category Name
                                    </FormLabel>
                                    <Input
                                        id='category_name'
                                        placeholder='Dairy'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        isDisabled={this.state.disabled}
                                        focusBorderColor='brand.200'
                                        onChange={this.handleNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Item Category name is required.
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
                                        Delete Item Category
                                    </Button>
                                    <Link to='/itemcategory/'>
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
