import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { User } from "../../types/Server";

function ForgotPassword() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateInput = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateInput(inputValue)) {
      setError("Please enter a valid email or phone number.");
      return;
    }

    try {
      const response = await fetch("https://json-server.liara.run/users");
      const users: User[] = await response.json();

      console.log("Users:", users);

      const normalizedInput = inputValue.replace(/-/g, "");

      const user = users.find(
        (u: User) =>
          u.email === inputValue ||
          (u.phone && u.phone.replace(/-/g, "") === normalizedInput),
      );

      if (!user) {
        setError("No user found with this email or phone number.");
        return;
      }

      setSuccessMessage(
        `Your password is: ${user.password}. You will be redirected to login in 5 seconds...`,
      );

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error("Error recovering password:", error);
      setError("An error occurred while processing your request.");
    }
  };
  return (
    <div className="flex items-center justify-center text-black">
      <Container>
        <div className="max-w-md w-full bg-gray-100 p-6 rounded-lg shadow-md mx-auto mt-64">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Forgot Password?
          </h2>
          {successMessage && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded mb-6 text-center">
              {successMessage}
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your email or phone number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Recover Password
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-500 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;
