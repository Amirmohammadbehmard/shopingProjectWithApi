import { useState } from "react";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { useLoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";

function Login() {
  const { handlerLogin } = useLoginContext();
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLoginClick = async () => {
    setError("");

    try {
      await handlerLogin(user.identifier, user.password);
    } catch {
      setError("username or password is incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center text-black">
      <Container>
        <div className="max-w-md w-full bg-gray-100 p-6 rounded-lg shadow-md mx-auto lg:mt-64 mt-48">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login to Your Account
          </h2>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              type="text"
              placeholder="Username or Email"
              name="identifier"
              value={user.identifier}
            />
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
            />
            <div className="flex justify-start">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-500 hover:underline "
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <Button
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
