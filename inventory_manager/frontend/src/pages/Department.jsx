import React, { Component } from 'react';
import {
    Center,
    Heading,
    Box,
    Stack,
    HStack,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';

export default class Department extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: undefined,
        };
    }

    componentDidMount() {
        this.getDepartmentList();
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

    render() {
        return (
            <>
                <Navbar />
                <Box
                    width='100%'
                    bg='brand.300'
                    color='brand.600'
                    height='100vh * 4'
                    style={{ minHeight: '100vh' }}
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
                                <Heading>Departments</Heading>
                                <Table size='lg'>
                                    <Thead>
                                        <Tr>
                                            <Th>Department ID</Th>
                                            <Th>Department Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {this.state.departments ? (
                                            this.state.departments.map(
                                                (dept) => (
                                                    <Tr
                                                        key={dept.department_id}
                                                    >
                                                        <Td>
                                                            {dept.department_id}
                                                        </Td>
                                                        <Td>
                                                            {
                                                                dept.department_name
                                                            }
                                                        </Td>
                                                    </Tr>
                                                )
                                            )
                                        ) : (
                                            <Tr>
                                                <Td>Loading...</Td>
                                                <Td></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>Department ID</Th>
                                            <Th>Department Name</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Box></Box>
                                <HStack spacing={2} mt={2}>
                                    <Link to='/department/create'>
                                        <Button>Add a department</Button>
                                    </Link>
                                    <Link to='/department/edit'>
                                        <Button>
                                            Modify an existing department
                                        </Button>
                                    </Link>
                                    <Link to='/'>
                                        <Button>Back to Home</Button>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    }
}
