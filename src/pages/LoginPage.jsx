import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "user" && password === "pass") {
      navigate("/upload");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
      </VStack>
    </Container>
  );
};

export default LoginPage;