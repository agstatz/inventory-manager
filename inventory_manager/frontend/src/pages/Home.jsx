import React, { Component } from 'react';
import {
	Text,
	Heading,
	Box,
	Center,
	Stack,
	Image,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { Navbar, SearchWidget } from '../components';

import HeaderImageReference from '../../static/images/headerimage.jpg';

export default class Home extends Component {
	render() {
		return (
			<Box>
				<Navbar />
				<Box width='100%' bg='brand.300' color='brand.600'>
					<Center>
						<Box
							bg='brand.500'
							m={[10, 10, 30, 40]}
							mt={[20, 20, 20, 20]}
							borderRadius='5px'
							maxWidth='1020px'
						>
							<Image
								src={HeaderImageReference}
								width='100%'
								borderTopRadius='5px'
								my='-10'
							></Image>
							<Stack m={[10, 10, 10, 10]} mt={[20, 20, 20, 20]}>
								<Grid
									columns={[1, 1, 1, 2]}
									gap={3}
									templateColumns='repeat(5, 1fr)'
								>
									<GridItem colSpan={3}>
										<Heading py='2'>
											Welcome to Inventory Manager
										</Heading>
										<Text py='2'>
											Inventory Manager is an application
											to help you manage your supply
											chain. Our application allows access
											to a robust database system capable
											of fulfilling all of your business
											needs.
										</Text>
										<Text py='2'>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua. Ut enim ad
											minim veniam, quis nostrud
											exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
											Duis aute irure dolor in
											reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla
											pariatur. Excepteur sint occaecat
											cupidatat non proident, sunt in
											culpa qui officia deserunt mollit
											anim id est laborum.
										</Text>
										<Text>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua. Ut enim ad
											minim veniam, quis nostrud
											exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
											Duis aute irure dolor in
											reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla
											pariatur. Excepteur sint occaecat
											cupidatat non proident, sunt in
											culpa qui officia deserunt mollit
											anim id est laborum.
										</Text>
									</GridItem>
									<GridItem colSpan={2} mx='4'>
										<Center>
											<SearchWidget />
										</Center>
									</GridItem>
								</Grid>
							</Stack>
						</Box>
					</Center>
				</Box>
			</Box>
		);
	}
}
