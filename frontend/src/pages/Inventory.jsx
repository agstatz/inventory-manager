import { Center, Heading, Box } from '@chakra-ui/react';
import { Navbar } from "../components";

function Inventory() {
return (
        <>
            <Navbar />
            <Box width="100%" bg="brand.300" color="brand.600">
                <Heading>
                    Inventory
                </Heading>
            </Box>
            
        </>
   
);
}

export default Inventory;