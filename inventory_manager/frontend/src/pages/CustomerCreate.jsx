import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    SimpleGrid,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Alert,
    AlertIcon,
    HStack,
    Checkbox,
    Input,
    InputLeftAddon,
    InputGroup,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

const MAX_ID_LENGTH = 5;
const MAX_NAME_LENGTH = 40;
const MAX_EMAIL_LENGTH = 50;
const MAX_ADDR_LENGTH = 100;
const MAX_PHONE_LENGTH = 10;

export default class CustomerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id: '',
            id_err: false,
            customer_fname: '',
            fname_err: false,
            customer_lname: '',
            lname_err: false,
            customer_email: '',
            email_err: false,
            customer_address: '',
            address_err: false,
            customer_phone: '',
            phone_err: false,
            customer_member: true,
            success: false,
            failure: '',
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleMemberChange = this.handleMemberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIDChange(e) {
        this.setState({
            customer_id: e.target.value,
            id_err: false,
            success: false,
            failure: '',
        });
    }

    handleFNameChange(e) {
        this.setState({
            customer_fname: e.target.value,
            fname_err: false,
            success: false,
            failure: '',
        });
    }

    handleLNameChange(e) {
        this.setState({
            customer_lname: e.target.value,
            lname_err: false,
            success: false,
            failure: '',
        });
    }

    handleEmailChange(e) {
        this.setState({
            customer_email: e.target.value,
            email_err: false,
            sucess: false,
            failure: '',
        });
    }

    handleAddressChange(e) {
        this.setState({
            customer_address: e.target.value,
            address_err: false,
            sucess: false,
            failure: '',
        });
    }

    handlePhoneChange(e) {
        this.setState({
            customer_phone: e.target.value,
            phone_err: false,
            sucess: false,
            failure: '',
        });
    }

    handleMemberChange(e) {
        this.setState({
            customer_member: e.target.checked,
            sucess: false,
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.customer_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.customer_fname.length == 0) {
            this.setState({
                fname_err: true,
            });
            isError = true;
        }

        if (this.state.customer_lname.length == 0) {
            this.setState({
                lname_err: true,
            });
            isError = true;
        }

        if (this.state.customer_email.length == 0) {
            this.setState({
                email_err: true,
            });
            isError = true;
        }

        if (this.state.customer_address.length == 0) {
            this.setState({
                address_err: true,
            });
            isError = true;
        }

        if (this.state.customer_phone.length == 0) {
            this.setState({
                phone_err: true,
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
                customer_id: this.state.customer_id,
                first_name: this.state.customer_fname,
                last_name: this.state.customer_lname,
                email_address: this.state.customer_email,
                address: this.state.customer_address,
                phone: this.state.customer_phone,
                member: this.state.customer_member,
            }),
        };
        fetch('/api/post-customer', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.customer_id) {
                    this.setState({
                        success: true,
                    });
                } else {
                    this.setState({
                        failure: 'An error occurred.',
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
                            <Heading margin={4}>Add a Customer</Heading>
                            <SimpleGrid columns={2} spacing={8} mx={3}>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='customer_id'>
                                        Customer ID
                                    </FormLabel>
                                    <Input
                                        id='customer_id'
                                        placeholder='00001'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                        maxLength={MAX_ID_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Customer ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.email_err}>
                                    <FormLabel htmlFor='customer_email'>
                                        Customer Email
                                    </FormLabel>
                                    <Input
                                        id='customer_email'
                                        placeholder='jdoe@email.com'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleEmailChange}
                                        maxLength={MAX_EMAIL_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Customer Email is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.fname_err}>
                                    <FormLabel htmlFor='customer_fname'>
                                        Customer First Name
                                    </FormLabel>
                                    <Input
                                        id='customer_name'
                                        placeholder='John'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleFNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Customer First Name is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.address_err}>
                                    <FormLabel htmlFor='customer_address'>
                                        Customer Address
                                    </FormLabel>
                                    <Input
                                        id='customer_address'
                                        placeholder='1009 East Jefferson Rd'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleAddressChange}
                                        maxLength={MAX_ADDR_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Customer Address is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.lname_err}>
                                    <FormLabel htmlFor='customer_fname'>
                                        Customer Last Name
                                    </FormLabel>
                                    <Input
                                        id='customer_name'
                                        placeholder='Doe'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleLNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Customer Last Name is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.phone_err}>
                                    <FormLabel htmlFor='customer_name'>
                                        Customer Phone
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='+1' />
                                        <Input
                                            id='customer_phone'
                                            placeholder='9100200020'
                                            variant='outline'
                                            bg='white'
                                            focusBorderColor='brand.200'
                                            onChange={this.handlePhoneChange}
                                            maxLength={MAX_PHONE_LENGTH}
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>
                                        Customer Phone is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.member_err}>
                                    <Checkbox
                                        defaultChecked
                                        onChange={this.handleMemberChange}
                                    >
                                        Member
                                    </Checkbox>
                                    <FormErrorMessage>
                                        Customer Member status is required.
                                    </FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>
                            <Center>
                                <HStack spacing={2} m={4}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <Link to='/customer/'>
                                        <Button type='cancel'>Cancel</Button>
                                    </Link>
                                </HStack>
                            </Center>
                            {this.state.success ? (
                                <Alert
                                    status='success'
                                    borderRadius='5px'
                                    variant='subtle'
                                >
                                    <AlertIcon />
                                    Customer created successfully.
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
                        </Box>
                    </Center>
                </Box>
            </Box>
        );
    }
}
