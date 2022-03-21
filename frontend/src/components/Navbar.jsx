import { HStack, Box, Flex, chakra,
         Button } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

function Navbar() {
    return (
        <chakra.header id="header" bg="brand.900">
            <Flex
                w="100%"
                px="6"
                py="5"
                align="center"
                justify="space-between">
                <Box
                fontSize={["2xl", , "2xl"]}
                fontWeight="semibold"
                color="brand.200"
            >
            Inventory Manager
            </Box>
                <HStack as="nav" spacing="5" color="brand.200">
                    <Button variant="nav">Inventory</Button>
                    <Button variant="nav">Locations</Button>
                    <Button variant="nav">Reports</Button>
                        <Button bg="brand.200" color="white" >Get Started</Button>
                </HStack>
                
            </Flex>
        </chakra.header>
    );
}

export default Navbar