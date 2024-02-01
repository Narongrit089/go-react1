import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from "@chakra-ui/react";

function SignIn({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        Email: email,
        Password: password,
      });

      if (response.data.message === "success") {
        onLoginSuccess();
        navigate("/"); // Redirect to the home page
        console.log("Login successful");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Login error:", error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Box className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Login
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </Text>
    </Box>
  );
}

SignIn.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default SignIn;
