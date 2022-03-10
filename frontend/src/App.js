import logo from './logo.svg';
import './App.css';
import { HStack, Text, Heading, Box, Flex, Center, 
         Button, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  return (
    <Box bg="brand.900">
        <Flex 
            bg="brand.900"
            position="fixed"
            fontWeight="semibold"
            w="100%"
            padding="3"
            boxShadow='sm'>
            <HStack spacing={6}>
                <Heading
                        fontSize={["2xl", , "2xl"]}
                        fontWeight="semibold"
                        color="brand.200"
                        align="left"
                        p="2"
                    >
                    Inventory Manager
                </Heading>
                <Button bg="brand.200">
                    Get Started
                </Button>
                <Button bg="brand.200">
                    Other stuff
                </Button>
            </HStack>
        </Flex>
        <Box width="100%" bg="brand.900" color="brand.100">
            <Center p="2">
                <Stack m={[10, 10, 40, 40]} mt={[20, 20, 20, 20]}>
                    <Heading>Welcome to Inventory Manager</Heading>
                    <Text>
                        Inventory Manager is an application to help you manage your supply chain.
                        Our application allows access to a robust database system capable of fulfilling
                        all of your business needs.
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </Stack>
               
            </Center>
        </Box>
    </Box>
  );
}

export default App;
