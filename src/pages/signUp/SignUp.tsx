import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username.trim()) {
      setError("Please enter a username.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateInputs()) {
      return;
    }

    try {
      const checkResponse = await fetch("https://json-server.liara.run/users");
      if (!checkResponse.ok) {
        throw new Error("Failed to fetch existing users.");
      }
      const users = await checkResponse.json();

      const userExists = users.some(
        (user: { username: string; email: string }) =>
          user.username === username || user.email === email,
      );

      if (userExists) {
        setError(
          "Username or email already exists. Please use a different one.",
        );
        return;
      }

      const numericId = Math.floor(Math.random() * 1000000);
      const stringId = numericId.toString();
      const response = await fetch("https://json-server.liara.run/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: stringId,
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user.");
      }

      setSuccessMessage("User created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: unknown) {
      let errorMessage = "An error occurred while processing your request.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error creating user:", error);
      setError(errorMessage);
    }
  };
  const inputFields: {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }[] = [
    {
      id: "username",
      type: "text",
      placeholder: "Enter your username",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      label: "Username",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      label: "Email",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      label: "Password",
    },
  ];

  return (
    <div className="flex items-center justify-center mt-64 text-black">
      <div className="w-full max-w-md mx-6  p-6 rounded-lg shadow-md bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            {inputFields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
