import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={NavLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.700" }} color="white">
            Home
          </Link>
          {isAuthenticated && (
            <Link as={NavLink} to="/upload" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.700" }} color="white">
              Upload
            </Link>
          )}
        </Box>
      {isAuthenticated && (
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;