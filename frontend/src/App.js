import './App.css';
import { Navbar } from "./components/";
import { Home } from "./pages/";
import { HStack, Text, Heading, Box, Flex, Center, chakra,
         Button, Stack, Input, InputGroup, InputLeftElement,
         Image } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  return (
    <>
        <Navbar />
        <Home />
    </>
  );
}

export default App;
