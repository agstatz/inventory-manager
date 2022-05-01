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

export default class EmployeeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee_id: '',
            id_err: false,
            employee_department_id: '',
            department_id_err: false,
            employee_first_name: '',
            first_name_err: false,
            employee_last_name: '',
            last_name_err: false,
            employee_email: '',
            email_err:false,
            employee_address: '',
            address_err:false,
            employee_phone: '',
            phone_err:false,
            employee_job_title: '',
            job_title_err:false,
            employee_salary: '',
            salary_err:false,


            success: false,
            failure: '',
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleDepartmentIdChange = this.handleDepartmentIdChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleIDChange(e) {
        this.setState({
            employee_id: e.target.value,
            id_err: false,
            success: false,
            failure: '',
        });
    }
    handleDepartmentIdChange(e) {
        this.setState({
            employee_department_id: e.target.value,
            department_id_err: false,
            success: false,
            failure: '',
        });
    }

    handleFirstNameChange(e) {
        this.setState({
            employee_first_name: e.target.value,
            first_name_err: false,
            success: false,
            failure: '',
        });
    }

    handleLastNameChange(e) {
        this.setState({
            employee_last_name: e.target.value,
            last_name_err: false,
            success: false,
            failure: '',
        });
    }

    handleEmailChange(e) {
        this.setState({
            employee_email: e.target.value,
            email_err: false,
            success: false,
            failure: '',
        });
    }

    handleAddressChange(e) {
        this.setState({
            employee_address: e.target.value,
            address_err: false,
            success: false,
            failure: '',
        });
    }employee_phone


    handlePhoneChange(e) {
        this.setState({
            employee_phone: e.target.value,
            phone_err: false,
            success: false,
            failure: '',
        });
    }

    handleJobTitleChange(e) {
        this.setState({
            employee_job_title: e.target.value,
            job_title_err: false,
            success: false,
            failure: '',
        });
    }

    handleSalaryChange(e) {
        this.setState({
            employee_salary: e.target.value,
            salary_err: false,
            success: false,
            failure: '',
        });
    }
    handleSubmit() {
        var isError = false;
        if (this.state.employee_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }
        if (this.state.employee_department_id.length == 0) {
            this.setState({
                department_id_err: true,
            });
            isError = true;
        }

        if (this.state.employee_first_name.length == 0) {
            this.setState({
                first_name_err: true,
            });
            isError = true;
        }

        if (this.state.employee_last_name.length == 0) {
            this.setState({
                last_name_err: true,
            });
            isError = true;
        }

        if (this.state.employee_email.length == 0) {
            this.setState({
                email_err: true,
            });
            isError = true;
        }

        if (this.state.employee_phone.length == 0) {
            this.setState({
                phone_err: true,
            });
            isError = true;
        }

        if (this.state.employee_address.length == 0) {
            this.setState({
                address_err: true,
            });
            isError = true;
        }

        if (this.state.employee_job_title.length == 0) {
            this.setState({
                job_title_err: true,
            });
            isError = true;
        }

        if (this.state.employee_salary.length == 0) {
            this.setState({
                salary_err: true,
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
                employee_id: this.state.employee_id,
                employee_department_id: this.state.employee_department_id,
                employee_first_name: this.state.employee_first_name,
                employee_last_name: this.state.employee_last_name,
                employee_email: this.state.employee_email,
                employee_address: this.state.employee_address,
                employee_phone: this.state.employee_phone,
                employee_job_title: this.state.employee_job_title,
                employee_salary: this.state.employee_salary,
            }),
        };
        fetch('/api/employee', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.employee_id[0].includes('already exists.')) {
                    this.setState({
                        failure: data.employee_id[0],
                    });
                } else if (data.employee_id[0].includes('error')) {
                    this.setState({
                        failure: data.employee_id[0],
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
                                <Heading>Add Employee</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee ID
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                        maxLength={MAX_ID_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.department_id_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee department ID
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleDepartmentIdChange}
                                        maxLength={MAX_ID_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.first_name_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee First Name
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='Marketing'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleFirstNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee First Name is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.last_name_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee Last Name
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleLastNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee Last Name is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.email_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee Email
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleEmailChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.address_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee Address
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleAddressChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee Address is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.phone_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee Phone
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handlePhoneChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee Phone number is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.job_title_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee job title 
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleJobTitleChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee job title is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.salary_err}>
                                    <FormLabel htmlFor='employee_id'>
                                        Employee salary
                                    </FormLabel>
                                    <Input
                                        id='employee_id'
                                        placeholder='KVY67'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleSalaryChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Employee salary is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <Link to='/employee/'>
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
                                        Employee added successfully.
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