import { HStack, Box, Flex, chakra,
         Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Navbar() {
    return (
        <chakra.header id="header" bg="brand.600">
            <Flex
                w="100%"
                px="6"
                py="5"
                align="center"
                justify="space-between">
                <Box
                fontSize={["2xl","2xl"]}
                fontWeight="semibold"
                color="brand.200"
            >
            Inventory Manager
            </Box>
                <HStack as="nav" spacing="4" color="brand.200">
                    <Button variant="link" color="brand.200">Inventory</Button>
                    <Button variant="link" color="brand.200">Locations</Button>
                    <Button variant="link" color="brand.200">Reports</Button>
                    <Button bg="brand.200" color="white" rightIcon={<ArrowForwardIcon />}>Get Started</Button>
                </HStack>
            </Flex>
        </chakra.header>
    );
}

export default Navbar