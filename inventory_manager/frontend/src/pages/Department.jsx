import React, { Component } from "react";
import { Center, Heading, Box, Stack, Button, Table,
        Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, } from '@chakra-ui/react';
import { Navbar } from "../components";
import { Link } from "react-router-dom";

export default class Department extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: undefined,
        }
    }
    
    getDepartmentList() {
        fetch('/api/get-department').then((response) => 
            response.json()).then((data) => {
                this.setState({
                    departments: data
                })
            })
    }

    componentDidMount() {
        this.getDepartmentList();
    }

    render() {
        return (
            <>
                <Navbar />
                <Box width="100%" bg="brand.300" color="brand.600" height="100vh">
                    <Center>
                        <Box bg="brand.500" borderRadius="5px" maxWidth="1020px" m={[10, 10, 30, 40]} mt={[20, 20, 20, 20]} p={1}>
                            <Stack m={[10, 10, 10, 10]} align="center" spacing={3} >
                            <Heading>
                                Departments
                            </Heading>
                            <Table size='lg'>
                                <Thead>
                                    <Tr>
                                    <Th>ID Number</Th>
                                    <Th>Department ID</Th>
                                    <Th>Department Name</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {this.state.departments ? this.state.departments.map((dept) => <Tr>
                                                                                                        <Td>{dept.id}</Td><Td>{dept.department_id}</Td><Td>{dept.department_name}</Td></Tr>) : <div>no</div>}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                    <Th>ID Number</Th>
                                    <Th>Department ID</Th>
                                    <Th>Department Name</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                            <Box></Box>
                            <Link to="/department/create">
                                <Button>
                                    Add a department
                                </Button>
                            </Link>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
                
            </>
        );
    }

}
