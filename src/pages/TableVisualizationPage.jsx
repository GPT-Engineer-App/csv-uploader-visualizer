import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Table, Thead, Tbody, Tr, Th, Td, Input, VStack, Select } from "@chakra-ui/react";
import TableComponent from "../components/TableComponent";

const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[index];
          return acc;
        }, {});
      });
      resolve(data);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const TableVisualizationPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (location.state && location.state.file) {
      parseCSV(location.state.file).then(parsedData => {
        setHeaders(Object.keys(parsedData[0]));
        setData(parsedData);
      });
    }
  }, [location.state]);

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <TableComponent data={data} headers={headers} />
      </VStack>
    </Container>
  );
};

export default TableVisualizationPage;