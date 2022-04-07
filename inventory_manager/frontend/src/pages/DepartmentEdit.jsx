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

export default class DepartmentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            existing_dept_id: '',
            disabled: true,
            new_dept_id: '',
            id_err: false,
            department_name: '',
            name_err: false,
            success: '',
            failure: '',
            departments: undefined,
        };

        this.handleIDExistingChange = this.handleIDExistingChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleIDExistingChange(e) {
        if (e.target.value === '') {
            this.setState({
                existing_dept_id: e.target.value,
                new_dept_id: e.target.value,
                disabled: true,
                id_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        var dept_name;
        for (let i = 0; i < this.state.departments.length; i++) {
            if (this.state.departments[i].department_id === e.target.value) {
                dept_name = this.state.departments[i].department_name;
                break;
            }
        }

        new_dept_id.value = e.target.value;
        department_name.value = dept_name;

        this.setState({
            existing_dept_id: e.target.value,
            new_dept_id: e.target.value,
            department_name: dept_name,
            disabled: false,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleIDChange(e) {
        this.setState({
            new_dept_id: e.target.value,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleNameChange(e) {
        this.setState({
            department_name: e.target.value,
            name_err: false,
            success: '',
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.new_dept_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.department_name.length == 0) {
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
                department_id: this.state.new_dept_id,
                department_name: this.state.department_name,
            }),
        };
        fetch('/api/post-department', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: 'Department updated successfully.',
                });
            });
    }

    handleDelete() {
        var isError = false;
        if (this.state.new_dept_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.department_name.length == 0) {
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
                department_id: this.state.new_dept_id,
                department_name: this.state.department_name,
            }),
        };
        fetch('/api/delete-department', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: true,
                    disabled: true,
                    existing_dept_id: '',
                    new_dept_id: '',
                    department_name: '',
                    id_err: false,
                    success: 'Department deleted successfully.',
                    failure: '',
                });
                new_dept_id.value = '';
                department_name.value = '';
                existing_dept_id.value = '';
                this.getDepartmentList();
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
                                <Heading>Edit Department</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='existing_dept_id'>
                                        Select a department
                                    </FormLabel>
                                    <Select
                                        id='existing_dept_id'
                                        placeholder='Select department'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleIDExistingChange}
                                    >
                                        {this.state.departments ? (
                                            this.state.departments.map(
                                                (dept) => (
                                                    <option
                                                        key={dept.department_id}
                                                        value={
                                                            dept.department_id
                                                        }
                                                    >
                                                        {dept.department_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No departments to display
                                            </option>
                                        )}
                                    </Select>
                                    <br />
                                    <FormLabel htmlFor='new_dept_id'>
                                        New Department ID
                                    </FormLabel>
                                    <Input
                                        id='new_dept_id'
                                        placeholder='MKTNG'
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
                                        Department ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.name_err}>
                                    <FormLabel htmlFor='department_name'>
                                        Department Name
                                    </FormLabel>
                                    <Input
                                        id='department_name'
                                        placeholder='Marketing'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        isDisabled={this.state.disabled}
                                        focusBorderColor='brand.200'
                                        onChange={this.handleNameChange}
                                        maxLength={MAX_NAME_LENGTH}
                                    />
                                    <FormErrorMessage>
                                        Department Name is required.
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
                                        Delete Department
                                    </Button>
                                    <Link to='/department/'>
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
