import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the CSV Uploader Application</Text>
        <Text>Start by logging in to upload your CSV files and visualize the data.</Text>
        <Button colorScheme="teal" onClick={() => navigate("/login")}>Login</Button>
      </VStack>
    </Container>
  );
};

export default Index;