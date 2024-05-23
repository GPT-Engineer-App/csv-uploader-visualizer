import { useState } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Select, VStack } from "@chakra-ui/react";

const TableComponent = ({ data, headers }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newRow, setNewRow] = useState({});

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setTableData([...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setTableData(data.filter(row => row[key].toString().includes(value)));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleCellEdit = (rowIndex, key, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][key] = value;
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow({});
  };

  const handleExport = () => {
    const csvContent = [
      headers.join(','),
      ...tableData.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <VStack spacing={4}>
      <Box>
        <Button onClick={handleExport}>Export</Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index} onClick={() => handleSort(header)}>
                {header} {sortConfig.key === header ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </Th>
            ))}
          </Tr>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>
                <Input
                  placeholder={`Filter ${header}`}
                  value={filters[header] || ''}
                  onChange={(e) => handleFilterChange(header, e.target.value)}
                />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <Td key={colIndex}>
                  <Input
                    value={row[header]}
                    onChange={(e) => handleCellEdit(rowIndex, header, e.target.value)}
                  />
                </Td>
              ))}
            </Tr>
          ))}
          <Tr>
            {headers.map((header, index) => (
              <Td key={index}>
                <Input
                  placeholder={`Add ${header}`}
                  value={newRow[header] || ''}
                  onChange={(e) => setNewRow({ ...newRow, [header]: e.target.value })}
                />
              </Td>
            ))}
            <Td>
              <Button onClick={handleAddRow}>Add Row</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Box>
        <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[10, 20, 50].map(size => (
            <option key={size} value={size}>{size} rows per page</option>
          ))}
        </Select>
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * rowsPerPage >= tableData.length}>Next</Button>
      </Box>
    </VStack>
  );
};

export default TableComponent;