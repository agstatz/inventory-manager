import { Input, InputGroup, InputLeftElement, Box, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Code } from '@chakra-ui/react'

function SearchWidget() {
    return (
        <Box bg="brand.300" borderRadius="5px" p="2" maxHeight="500px" maxWidth="300px">
            <Text mb='8px'>Search the database below:</Text>
            <InputGroup>
                <InputLeftElement 
                    pointerEvents='none'
                    children={<SearchIcon />}/>
                <Input variant='filled' placeholder='Search' />
            </InputGroup>
            <Text>Possible searches include:</Text>
            <Code colorScheme="blackAlpha">1000 Western Boulevard</Code><br />
            <Code colorScheme="blackAlpha">12/20/2020</Code><br />
            <Code colorScheme="blackAlpha">2300230</Code><br />
        </Box>
    );
}

export default SearchWidget;