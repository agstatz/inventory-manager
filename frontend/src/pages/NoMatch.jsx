import { Center, Heading, Box } from '@chakra-ui/react'

function NoMatch() {
return (
    <Box bg="brand.300" height="100vh">
        <Center p="10">
            <Heading>
                No Page Found!
            </Heading>
        </Center>
    </Box>
   
);
}

export default NoMatch;