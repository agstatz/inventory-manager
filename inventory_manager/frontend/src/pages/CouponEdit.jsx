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

export default class CouponEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            existing_coupon_id: '',
            disabled: true,

            new_coupon_id: '',
            id_err: false,

            discount_rate: 0.0,
            discount_err: false,

            valid_from: '',
            valid_from_err: false,

            valid_to: '',
            valid_to_err: false,

            success: '',
            failure: '',

            coupons: undefined,
        };

        this.handleIDExistingChange = this.handleIDExistingChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleDiscountRateChange =
            this.handleDiscountRateChange.bind(this);
        this.handleValidFromChange = this.handleValidFromChange.bind(this);
        this.handleValidToChange = this.handleValidToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getCouponList();
    }

    getCouponList() {
        fetch('/api/get-coupon')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    coupons: data,
                });
            });
    }

    handleIDExistingChange(e) {
        if (e.target.value === '') {
            this.setState({
                existing_coupon_id: e.target.value,
                new_coupon_id: e.target.value,
                disabled: true,
                id_err: false,
                success: '',
                failure: '',
            });
            return;
        }

        var discount_rate;
        var valid_from;
        var valid_to;
        for (let i = 0; i < this.state.coupons.length; i++) {
            if (this.state.coupons[i].coupon_id === e.target.value) {
                discount_rate = this.state.coupons[i].discount_rate;
                valid_from = this.state.coupons[i].valid_from;
                valid_to = this.state.coupons[i].valid_to;
                break;
            }
        }

        new_coupon_id.value = e.target.value;

        this.setState({
            existing_coupon_id: e.target.value,
            new_coupon_id: e.target.value,
            discount_rate: discount_rate,
            valid_from: valid_from,
            valid_to: valid_to,
            disabled: false,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleIDChange(e) {
        this.setState({
            new_coupon_id: e.target.value,
            id_err: false,
            success: '',
            failure: '',
        });
    }

    handleDiscountRateChange(e) {
        this.setState({
            discount_rate: e.target.value,
            discount_err: false,
            success: '',
            failure: '',
        });
    }

    handleValidFromChange(e) {
        this.setState({
            valid_from: e.target.value,
            valid_from_err: false,
            success: false,
            failure: '',
        });
    }

    handleValidToChange(e) {
        this.setState({
            valid_to: e.target.value,
            valid_to_err: false,
            success: false,
            failure: '',
        });
    }

    handleSubmit() {
        var isError = false;
        if (this.state.new_coupon_id.length == 0) {
            this.setState({
                id_err: true,
            });
            isError = true;
        }

        if (this.state.discount_rate <= 0 || this.state.discount_rate > 100) {
            this.setState({
                discount_err: true,
            });
            isError = true;
        }

        if (
            this.state.valid_from.length == 0 ||
            this.state.valid_from >= this.state.valid_to ||
            this.state.valid_from < Date.parse('01 Jan 1970 00:00:00 GMT')
        ) {
            this.setState({
                valid_from_err: true,
            });
            isError = true;
        }

        if (
            this.state.valid_to.length == 0 ||
            this.state.valid_to <= this.state.valid_from ||
            this.state.valid_to < Date.now()
        ) {
            this.setState({
                valid_to_err: true,
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
                coupon_id: this.state.new_coupon_id,
                discount_rate: this.state.discount_rate,
                valid_from: this.state.valid_from,
                valid_end: this.state.valid_to,
            }),
        };
        fetch('/api/post-coupon', requestOptions)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                this.setState({
                    success: 'Coupon updated successfully.',
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
                                <Heading>Edit Coupon</Heading>
                                <FormControl isInvalid={this.state.id_err}>
                                    <FormLabel htmlFor='existing_coupon_id'>
                                        Select a coupon
                                    </FormLabel>
                                    <Select
                                        id='existing_coupon_id'
                                        placeholder='Select coupon'
                                        focusBorderColor='brand.200'
                                        variant='filled'
                                        my='auto'
                                        bg='white'
                                        onChange={this.handleIDExistingChange}
                                    >
                                        {this.state.coupons ? (
                                            this.state.coupons.map((coupon) => (
                                                <option
                                                    key={coupon.coupon_id}
                                                    value={coupon.coupon_id}
                                                >
                                                    {coupon.coupon_id}
                                                </option>
                                            ))
                                        ) : (
                                            <option value='empty'>
                                                No coupons to display
                                            </option>
                                        )}
                                    </Select>
                                    <br />
                                    <FormLabel htmlFor='new_coupon_id'>
                                        New Coupon ID
                                    </FormLabel>
                                    <Input
                                        id='new_coupon_id'
                                        placeholder='25OFF'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        isReadOnly={true}
                                        isDisabled={this.state.disabled}
                                        focusBorderColor='brand.200'
                                        onChange={this.handleIDChange}
                                    />
                                    <FormErrorMessage>
                                        Coupon ID is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={this.state.discount_err}
                                >
                                    <FormLabel htmlFor='discount_rate'>
                                        Discount Rate
                                    </FormLabel>
                                    <Input
                                        id='discount_rate'
                                        placeholder='25.0'
                                        variant='outline'
                                        bg='white'
                                        my='auto'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleDiscountRateChange}
                                    />
                                    <FormErrorMessage>
                                        Discount rate must be (0.0, 100.0) and
                                        is required.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={this.state.valid_from_err}
                                >
                                    <FormLabel htmlFor='valid_from'>
                                        Valid From
                                    </FormLabel>
                                    <Input
                                        id='valid_from'
                                        type='date'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleValidFromChange}
                                    />
                                    <FormErrorMessage>
                                        Invalid starting date.
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={this.state.valid_to_err}
                                >
                                    <FormLabel htmlFor='valid_from'>
                                        Valid To
                                    </FormLabel>
                                    <Input
                                        id='valid_to'
                                        type='date'
                                        variant='outline'
                                        bg='white'
                                        focusBorderColor='brand.200'
                                        onChange={this.handleValidToChange}
                                    />
                                    <FormErrorMessage>
                                        Invalid ending date.
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
                                    <Link to='/coupon/'>
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
