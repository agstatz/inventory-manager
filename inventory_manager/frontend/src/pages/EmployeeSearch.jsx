import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    HStack,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Table,
    Tooltip,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

const MAX_NAME_LENGTH = 40;

export default class EmployeeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee_fname: '',
            fname_err: false,
            employee_lname: '',
            lname_err: false,
            success: false,
            failure: '',
            employees: [],
        };

        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleFNameChange(e) {
        this.setState({
            employee_fname: e.target.value,
            fname_err: false,
            success: false,
            failure: '',
        });
    }

    submitSearch() {
        var isError = false;

        if (this.state.employee_fname.length == 0) {
            this.setState({
                fname_err: true,
            });
            isError = true;
        }

        if (isError) {
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(
            '/api/get-search-employee?first_name=' + this.state.employee_fname,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data);
                if (!data[0]) {
                    this.setState({
                        employees: [],
                    });
                    return;
                }
                if (data[0].fields) {
                    console.log(data);
                    if (data.length === 0) {
                        this.setState({
                            employees: [],
                        });
                    }

                    let list = [];
                    for (let i = 0; i < data.length; i++) {
                        list.push(data[i].fields);
                    }

                    this.setState({
                        employees: list,
                        success: true,
                    });
                } else {
                    this.setState({
                        employees: [],
                        failure: 'An error occurred.',
                    });
                }
            });
    }

    render() {
        return (
            <>
                <Navbar />
                <Box
                    width='100%'
                    bg='brand.300'
                    color='brand.600'
                    height='100vh'
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
                                <Heading>Search Employees</Heading>
                                <HStack spacing={2} m={2}>
                                    <FormControl
                                        isInvalid={this.state.fname_err}
                                    >
                                        <Input
                                            id='employee_name'
                                            placeholder='Search Employee By Name'
                                            variant='outline'
                                            bg='white'
                                            focusBorderColor='brand.200'
                                            onChange={this.handleFNameChange}
                                            maxLength={MAX_NAME_LENGTH}
                                        />
                                        <FormErrorMessage>
                                            Search value is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        type='submit'
                                        onClick={this.submitSearch}
                                    >
                                        Search
                                    </Button>
                                </HStack>

                                <Table size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th isNumeric>ID</Th>
                                            <Th isNumeric>Department ID</Th>
                                            <Th> Name</Th>
                                            <Th>Email</Th>
                                            <Th>Address</Th>
                                            <Th isNumeric>Phone</Th>
                                            <Th>Job Title</Th>
                                            <Th isNumeric>Salary</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.employees ? (
                                            this.state.employees.map((empl) => (
                                                <Tr key={empl.employee_id}>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.employee_id}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.department_id}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.first_name +
                                                                ' ' +
                                                                empl.last_name}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.email}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.address}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.phone}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.job_title}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            ${empl.salary}
                                                        </Link>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : this.props.employee ? (
                                            this.props.employee.map((empl) => (
                                                <Tr key={empl.employee_id}>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.employee_id}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.department_id}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.first_name +
                                                                ' ' +
                                                                empl.last_name}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.email}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.address}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.phone}
                                                        </Link>
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.job_title}
                                                        </Link>
                                                    </Td>
                                                    <Td isNumeric>
                                                        <Link
                                                            to={`/employee/${empl.employee_id}`}
                                                        >
                                                            {empl.salary}
                                                        </Link>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th isNumeric>ID</Th>
                                            <Th isNumeric>Department ID</Th>
                                            <Th> Name</Th>
                                            <Th>Email</Th>
                                            <Th>Address</Th>
                                            <Th isNumeric>Phone</Th>
                                            <Th>Job Title</Th>
                                            <Th isNumeric>Salary</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </Stack>
                            <Center>
                                <HStack spacing={2} m={2}>
                                    <Link to='/employee/'>
                                        <Button type='cancel'>Cancel</Button>
                                    </Link>
                                </HStack>
                            </Center>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
