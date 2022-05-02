import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    Select,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Alert,
    AlertIcon,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    SimpleGrid,
    HStack,
    Input,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

const MAX_ID_LENGTH = 5;
const MAX_NAME_LENGTH = 40;
const MAX_PHONE_LENGTH = 10;
const MAX_SALARY_LENGTH = 8;

export default class EmployeeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee_id: '',
            disabled: true,
            id_err: false,
            employee_department_id: '',
            department_id_err: false,
            employee_first_name: '',
            first_name_err: false,
            employee_last_name: '',
            last_name_err: false,
            employee_email: '',
            email_err: false,
            employee_address: '',
            address_err: false,
            employee_phone: '',
            phone_err: false,
            employee_job_title: '',
            job_title_err: false,
            employee_salary: '',
            salary_err: false,
            departments: [],
            success: false,
            employees: [],
            failure: '',
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleDepartmentIdChange =
            this.handleDepartmentIdChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getDepartmentList = this.getDepartmentList.bind(this);
        this.getEmployeeList = this.getEmployeeList.bind(this);

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.getDepartmentList();
        this.getEmployeeList();
    }

    getDepartmentList() {
        fetch('/api/get-department')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    departments: data,
                });
            });
    }

    handleRemove() {
        let isError = false;
        if (this.state.employee_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (isError) {
            return;
        }

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(
            '/api/delete-employee?employee_id=' + this.state.employee_id,
            requestOptions
        )
            .then((response) => response)
            .then((data) => {
                this.setState({
                    employee_id: '',
                    id_err: false,
                    success: true,
                    disabled: false,
                    employee_department_id: '',
                    department_id_err: false,
                    employee_first_name: '',
                    first_name_err: false,
                    employee_last_name: '',
                    last_name_err: false,
                    employee_email: '',
                    email_err: false,
                    employee_address: '',
                    address_err: false,
                    employee_phone: '',
                    phone_err: false,
                    employee_job_title: '',
                    job_title_err: false,
                    employee_salary: '',
                    salary_err: false,
                    failure: '',
                });

                selected_employee_id.value = '';
                department_id.value = '';
                employee_first_name.value = '';
                employee_last_name.value = '';
                employee_email.value = '';
                employee_address.value = '';
                employee_phone.value = '';
                employee_job_title.value = '';
                employee_salary.value = '';
            });
    }

    getEmployeeList() {
        fetch('/api/get-employee')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    employees: data,
                });
            });
    }

    handleIDChange(e) {
        if (e.target.value === '') {
            this.setState({
                employee_id: e.target.value,
                id_err: false,
                success: false,
                disabled: true,
                employee_department_id: '',
                department_id_err: false,
                employee_first_name: '',
                first_name_err: false,
                employee_last_name: '',
                last_name_err: false,
                employee_email: '',
                email_err: false,
                employee_address: '',
                address_err: false,
                employee_phone: '',
                phone_err: false,
                employee_job_title: '',
                job_title_err: false,
                employee_salary: '',
                salary_err: false,
                failure: '',
            });
            return;
        }

        var currentEmployee;
        for (let i = 0; i < this.state.employees.length; i++) {
            if (
                this.state.employees[i].employee_id.toString() ===
                e.target.value
            ) {
                currentEmployee = this.state.employees[i];
            }
        }

        department_id.value = currentEmployee.department_id;
        employee_first_name.value = currentEmployee.first_name;
        employee_last_name.value = currentEmployee.last_name;
        employee_email.value = currentEmployee.email;
        employee_address.value = currentEmployee.address;
        employee_phone.value = currentEmployee.phone;
        employee_job_title.value = currentEmployee.job_title;
        employee_salary.value = currentEmployee.salary;

        this.setState({
            employee_id: e.target.value,
            id_err: false,
            success: false,
            disabled: false,
            employee_department_id: currentEmployee.department_id,
            department_id_err: false,
            employee_first_name: currentEmployee.first_name,
            first_name_err: false,
            employee_last_name: currentEmployee.last_name,
            last_name_err: false,
            employee_email: currentEmployee.email,
            email_err: false,
            employee_address: currentEmployee.address,
            address_err: false,
            employee_phone: currentEmployee.phone,
            phone_err: false,
            employee_job_title: currentEmployee.job_title,
            job_title_err: false,
            employee_salary: currentEmployee.salary,
            salary_err: false,
            failure: '',
        });
    }

    handleDepartmentIdChange(e) {
        if (e.target.value === '') {
            this.setState({
                employee_department_id: e.target.value,
                department_id_err: false,
                success: '',
                failure: '',
            });
            return;
        }

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
    }

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
        console.log(this.state);
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

        console.log(this.state);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                employee_id: this.state.employee_id,
                department_id: this.state.employee_department_id,
                first_name: this.state.employee_first_name,
                last_name: this.state.employee_last_name,
                email: this.state.employee_email,
                address: this.state.employee_address,
                phone: this.state.employee_phone,
                job_title: this.state.employee_job_title,
                salary: this.state.employee_salary,
            }),
        };
        fetch('/api/post-employee', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    success: true,
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
                                <Heading>Edit Employee</Heading>
                                <SimpleGrid columns={2} spacing={8} mx={3}>
                                    <FormControl isInvalid={this.state.id_err}>
                                        <FormLabel htmlFor='selected_employee_id'>
                                            Employee ID
                                        </FormLabel>
                                        <Select
                                            id='selected_employee_id'
                                            placeholder='Select Employee'
                                            focusBorderColor='brand.200'
                                            variant='filled'
                                            my='auto'
                                            bg='white'
                                            onChange={this.handleIDChange}
                                        >
                                            {this.state.employees ? (
                                                this.state.employees.map(
                                                    (employee) => (
                                                        <option
                                                            key={
                                                                employee.employee_id
                                                            }
                                                            value={
                                                                employee.employee_id
                                                            }
                                                        >
                                                            {
                                                                employee.employee_id
                                                            }
                                                        </option>
                                                    )
                                                )
                                            ) : (
                                                <option value='empty'>
                                                    No Employees to display
                                                </option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={this.state.department_id_err}
                                    >
                                        <FormLabel htmlFor='selected_department_id'>
                                            Department ID
                                        </FormLabel>
                                        <Select
                                            id='department_id'
                                            placeholder='Select Department'
                                            focusBorderColor='brand.200'
                                            disabled={this.state.disabled}
                                            variant='filled'
                                            my='auto'
                                            bg='white'
                                            onChange={
                                                this.handleDepartmentIdChange
                                            }
                                        >
                                            {this.state.departments ? (
                                                this.state.departments.map(
                                                    (department) => (
                                                        <option
                                                            key={
                                                                department.department_id
                                                            }
                                                            value={
                                                                department.department_id
                                                            }
                                                        >
                                                            {
                                                                department.department_id
                                                            }
                                                        </option>
                                                    )
                                                )
                                            ) : (
                                                <option value='empty'>
                                                    No Departments to display
                                                </option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={this.state.first_name_err}
                                    >
                                        <FormLabel htmlFor='employee_id'>
                                            Employee First Name
                                        </FormLabel>
                                        <Input
                                            id='employee_first_name'
                                            placeholder='Jane'
                                            disabled={this.state.disabled}
                                            variant='outline'
                                            bg='white'
                                            focusBorderColor='brand.200'
                                            onChange={
                                                this.handleFirstNameChange
                                            }
                                            maxLength={MAX_NAME_LENGTH}
                                        />
                                        <FormErrorMessage>
                                            Employee First Name is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={this.state.last_name_err}
                                    >
                                        <FormLabel htmlFor='employee_id'>
                                            Employee Last Name
                                        </FormLabel>
                                        <Input
                                            id='employee_last_name'
                                            placeholder='Doe'
                                            disabled={this.state.disabled}
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
                                    <FormControl
                                        isInvalid={this.state.email_err}
                                    >
                                        <FormLabel htmlFor='employee_id'>
                                            Employee Email
                                        </FormLabel>
                                        <Input
                                            id='employee_email'
                                            placeholder='jdoe@email.com'
                                            disabled={this.state.disabled}
                                            variant='outline'
                                            bg='white'
                                            my='auto'
                                            focusBorderColor='brand.200'
                                            onChange={this.handleEmailChange}
                                            maxLength={MAX_NAME_LENGTH}
                                        />
                                        <FormErrorMessage>
                                            Employee Email is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={this.state.address_err}
                                    >
                                        <FormLabel htmlFor='employee_id'>
                                            Employee Address
                                        </FormLabel>
                                        <Input
                                            id='employee_address'
                                            placeholder='210 West Purdue Ln'
                                            disabled={this.state.disabled}
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
                                    <FormControl
                                        isInvalid={this.state.phone_err}
                                    >
                                        <FormLabel htmlFor='employee_phone'>
                                            Employee Phone
                                        </FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='+1' />
                                            <Input
                                                id='employee_phone'
                                                placeholder='1234567890'
                                                disabled={this.state.disabled}
                                                variant='outline'
                                                bg='white'
                                                my='auto'
                                                focusBorderColor='brand.200'
                                                onChange={
                                                    this.handlePhoneChange
                                                }
                                                maxLength={MAX_PHONE_LENGTH}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>
                                            Employee Phone number is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={this.state.job_title_err}
                                    >
                                        <FormLabel htmlFor='employee_id'>
                                            Employee job title
                                        </FormLabel>
                                        <Input
                                            id='employee_job_title'
                                            placeholder='Manager'
                                            disabled={this.state.disabled}
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
                                    <FormControl
                                        isInvalid={this.state.salary_err}
                                    >
                                        <FormLabel htmlFor='employee_salary'>
                                            Employee salary
                                        </FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none'
                                                color='gray.300'
                                                fontSize='1.2em'
                                                children='$'
                                            />
                                            <Input
                                                id='employee_salary'
                                                placeholder='55000.00'
                                                disabled={this.state.disabled}
                                                variant='outline'
                                                bg='white'
                                                my='auto'
                                                focusBorderColor='brand.200'
                                                onChange={
                                                    this.handleSalaryChange
                                                }
                                                maxLength={MAX_SALARY_LENGTH}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>
                                            Employee salary is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                </SimpleGrid>
                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type='submit'
                                        onClick={this.handleRemove}
                                    >
                                        Remove
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
                                        Employee updated successfully.
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
