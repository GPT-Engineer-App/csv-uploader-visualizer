import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      navigate("/table", { state: { file } });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Text>Please upload your CSV file below. Only .csv files are accepted.</Text>
        <FormControl id="file">
          <FormLabel>CSV File</FormLabel>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleUpload}>Upload</Button>
      </VStack>
    </Container>
  );
};

export default UploadPage;