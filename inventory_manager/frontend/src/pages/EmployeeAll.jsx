import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    Button,
    Tooltip,
    Table,
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

class EmployeeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: undefined,
        };

        this.getEmployeeList = this.getEmployeeList.bind(this);
    }

    componentDidMount() {
        this.getEmployeeList();
    }

    // filters customer list on

    getEmployeeList() {
        fetch('/api/get-employee')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    employee: data,
                });
            });
    }
    render() {
        return (
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
                    {this.state.employee ? (
                        this.state.employee.map((empl) => (
                            <Tr key={empl.employee_id}>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.employee_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.department_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.first_name + ' ' + empl.last_name}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.email}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.address}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.phone}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.job_title}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        ${empl.salary}
                                    </Link>
                                </Td>
                            </Tr>
                        ))
                    ) : this.props.employee ? (
                        this.props.employee.map((empl) => (
                            <Tr key={empl.employee_id}>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.employee_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.department_id}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.first_name + ' ' + empl.last_name}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.email}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.address}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.phone}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.job_title}
                                    </Link>
                                </Td>
                                <Td isNumeric>
                                    <Link to={`/employee/${empl.employee_id}`}>
                                        {empl.salary}
                                    </Link>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td>Loading...</Td>
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
        );
    }
}

export default class EmployeeAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: undefined,
        };
    }

    componentDidMount() {
        this.getEmployeeList();
    }

    // filters customer list on

    getEmployeeList() {
        fetch('/api/get-employee')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    employee: data,
                });
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
                                <Heading>All Employees</Heading>
                                <EmployeeTable employee={this.state.employee} />
                                <Link to='/employee'>
                                    <Button>Cancel</Button>
                                </Link>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
