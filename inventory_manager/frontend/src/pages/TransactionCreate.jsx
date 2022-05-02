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

export default class TransactionCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            transaction_id: '',
            transaction_id_err: false,

            transaction_date: '',
            transaction_date_err: false,

            total: null,
            total_err: false,

            success: '',
            failure: '',

            coupons: null,
            coupon_err:false,
            selected_coupon_id:null,

            customers: null,
            customer_err:false,
            selected_customer_id:null,

            stores: null,
            store_err:false,
            selected_store_id:null,

            employees: null,
            employee_err:false,
            selected_employee_id:null,

            items_id:"",
            items_err:false,
        };

        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleCouponChange = this.handleCouponChange.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
        this.handleTransactionDateChange = this.handleTransactionDateChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemsChange = this.handleItemsChange.bind(this)
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        fetch('/api/get-coupon')
            .then((response) => response.json())
            .then((data) => {
                const null_coupon = {coupon_id:"No Coupon Used"}
                data.unshift(null_coupon)
                this.setState({
                    coupons:data,
                })
            });
        
        fetch("/api/get-customer")
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({
                    customers:data
                })
            })
        
        // Add when store implemented
        
        fetch("/api/get-store")
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({
                    stores:data
                })
            })
        
       // Add when get employees implemented
        
        fetch("/api/get-employee")
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({
                    employees:data
                })
            })
        
    }

    handleIDChange(e){
        this.setState({
            transaction_id: e.target.value
        })
    }

    handleCouponChange(e) {
        if (e.target.value === '') {
            this.setState({
                selected_coupon_id: e.target.value,
                coupon_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            selected_coupon_id: e.target.value,
            coupon_err: false,
            success: '',
            failure: '',
        })
    }

    handleStoreChange(e){
        if (e.target.value === '') {
            this.setState({
                selected_store_id: e.target.value,
                store_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            selected_store_id: e.target.value,
            store_err: false,
            success: '',
            failure: '',
        })
    }

    handleCustomerChange(e){
        if (e.target.value === '') {
            this.setState({
                selected_customer_id: e.target.value,
                customer_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            selected_customer_id: e.target.value,
            customer_err: false,
            success: '',
            failure: '',
        })
    }

    handleEmployeeChange(e){
        if (e.target.value === '') {
            this.setState({
                selected_employee_id: e.target.value,
                employee_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        this.setState({
            selected_employee_id: e.target.value,
            employee_err: false,
            success: '',
            failure: '',
        })
    }

    handleTransactionDateChange(e) {
        this.setState({
            transaction_date: e.target.value,
            transaction_date_err: false,
            success: false,
            failure: '',
        });
    }

    handleTotalChange(e){
        this.setState({
            total: e.target.value,
            total_err: false,
            success:false
        })
    }

    handleItemsChange(e){
        this.setState({
            items_id: e.target.value,
            items_err: false,
            success:false
        })
    }


    handleSubmit() {
        var isError = false;

        if(isNaN(this.state.transaction_id)){
            this.setState({
                transaction_id_err:true
            })
            isError = true;
        }

        // To be added when customers are done
        if (!this.state.selected_customer_id) {
            this.setState({
                customer_err: true,
            });
            isError = true;
        }

        // To be added when store is done
        
        if(!this.state.selected_store_id){
            this.setState({
                store_err: true,
            });
            isError = true;
        }

        // To be added when employee is done
        
        if(!this.state.selected_employee_id){
            this.setState({
                employee_err: true,
            });
            isError = true;
        }
        

        if(this.state.items_id.length == 0){
            this.setState({
                items_err:true
            })
            isError = true
        }

        if (isNaN(this.state.total) || Number(this.state.total) <= 0){
            this.setState({
                total_err: true,
            });
            isError = true;
        }

        if (this.state.transaction_date.length == 0 || this.state.transaction_date < Date.parse('01 Jan 1970 00:00:00 GMT')) {
            this.setState({
                transaction_date_err: true,
            });
            isError = true;
        }

        if (isError) {
            return;
        }

        const selected_coup = this.state.selected_coupon_id === "No Coupon Used"? null: this.state.selected_coupon_id

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                transaction_id: Number(this.state.transaction_id),
                transaction_date: this.state.transaction_date,
                total: Number(this.state.total),
                customer_id: this.state.selected_customer_id,
                coupon_id: selected_coup,
                store_id: this.state.selected_store_id,
                employee_id: this.state.selected_employee_id,
                items_id: this.state.items_id
            }),
        };
        fetch('/api/post-transaction', requestOptions)
        .then(response=>response.json())
        .then(data=>{
            if(data.message == "Invalid"){
                this.setState({
                    items_err: true
                })
            } else{
                this.setState({
                    success: 'Transaction added successfully.',
                });
            }
            
        })
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
                                <Heading>Add Transaction </Heading>
                                <FormControl isInvalid={this.state.transaction_id_err}>
                                    <FormLabel htmlFor='transaction_id'>
                                        Transaction ID
                                    </FormLabel>
                                    <Input
                                        id='transaction_id'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                    />
                                    <FormErrorMessage>
                                        Transaction ID must be a valid number
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.coupon_err}>
                                    <FormLabel htmlFor='selected_coupon_id'>
                                        Select coupon
                                    </FormLabel>
                                    <Select
                                        id='selected_coupon_id'
                                        placeholder=""
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleCouponChange}
                                    >
                                        {this.state.coupons ? (
                                            this.state.coupons.map(
                                                (coupon) => (
                                                    <option
                                                        key={coupon.coupon_id}
                                                        value={
                                                            coupon.coupon_id
                                                        }
                                                    >
                                                        {coupon.coupon_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No coupons to display
                                            </option>
                                        )}
                                    </Select>
                                    <FormErrorMessage>
                                        Invalid Coupon
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.customer_err}>
                                    <FormLabel htmlFor='selected_customer_id'>
                                        Customer ID
                                    </FormLabel>
                                    <Select
                                        id='selected_customer_id'
                                        placeholder='Select customer'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleCustomerChange}
                                    >
                                        {this.state.customers ? (
                                            this.state.customers.map(
                                                (customer) => (
                                                    <option
                                                        key={customer.customer_id}
                                                        value={
                                                            customer.customer_id
                                                        }
                                                    >
                                                        {customer.customer_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No customers to display
                                            </option>
                                        )}
                                    </Select>
                                    <FormErrorMessage>
                                        Invalid customer ID
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.total_err}>
                                    <FormLabel htmlFor='total_err'>
                                        Transacted amount (before coupons)
                                    </FormLabel>
                                    <Input
                                        id='total_err'
                                        placeholder='10.0'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleTotalChange}
                                    />
                                    <FormErrorMessage>
                                        Transaction amount must be {'>'} 0.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.transaction_date_err}>
                                    <FormLabel htmlFor='transaction_date'>
                                        Transaction date
                                    </FormLabel>
                                    <Input
                                        id='transaction_date'
                                        type='date'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleTransactionDateChange}
                                    />
                                    <FormErrorMessage>
                                        Invalid date of transaction
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={this.state.store_err}>
                                    <FormLabel htmlFor='selected_coupon_id'>
                                        Store
                                    </FormLabel>
                                    <Select
                                        id='selected_coupon_id'
                                        placeholder='Select store'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleStoreChange}
                                    >
                                        {this.state.stores ? (
                                            this.state.stores.map(
                                                (store) => (
                                                    <option
                                                        key={store.store_id}
                                                        value={
                                                            store.store_id
                                                        }
                                                    >
                                                        {store.store_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No stores available
                                            </option>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl isInvalid={this.state.employee_err}>
                                    <FormLabel htmlFor='selected_coupon_id'>
                                        Employee ID
                                    </FormLabel>
                                    <Select
                                        id='selected_coupon_id'
                                        placeholder='Select employee'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleEmployeeChange}
                                    >
                                        {this.state.employees ? (
                                            this.state.employees.map(
                                                (employee) => (
                                                    <option
                                                        key={employee.employee_id}
                                                        value={
                                                            employee.employee_id
                                                        }
                                                    >
                                                        {employee.employee_id}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value='empty'>
                                                No employees found
                                            </option>
                                        )}
                                    </Select>
                                    <FormControl isInvalid={this.state.items_err}>
                                    <FormLabel htmlFor='items_err'>
                                        Transacted items
                                    </FormLabel>
                                    <Input
                                        id='items_err'
                                        placeholder=""
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleItemsChange}
                                    />
                                    <FormErrorMessage>
                                        Invalid items selected
                                    </FormErrorMessage>
                                </FormControl>
                                    <br />
                                </FormControl>
                                <br />
                                <HStack spacing={2} mt={2}>
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                    >
                                        Submit Changes
                                    </Button>
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

