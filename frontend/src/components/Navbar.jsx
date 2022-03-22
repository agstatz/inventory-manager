import { HStack, Text, Flex, chakra,
         Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <chakra.header id="header" bg="brand.600">
            <Flex
                w="100%"
                px="6"
                py="3"
                align="center"
                justify="space-between"
            >
                <Text
                    fontSize={["2xl","2xl"]}
                    fontWeight="semibold"
                    color="brand.200"
                    class="Nav-Header"
                >
                    Inventory Manager
                </Text>
                <HStack as="nav" spacing="4" color="brand.200">
                    <Link to="/inventory"><Button variant="link" color="brand.200">Inventory</Button></Link>
                    <Link to="/locations"><Button variant="link" color="brand.200">Locations</Button></Link>
                    <Link to="/reports"><Button variant="link" color="brand.200">Reports</Button></Link>
                    <Link to="/login"><Button bg="brand.200" color="white" rightIcon={<ArrowForwardIcon />}>Get Started</Button></Link>
                </HStack>
            </Flex>
        </chakra.header>
    );
}

export default Navbar;