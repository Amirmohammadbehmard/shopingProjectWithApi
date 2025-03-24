import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center lg:mt-64 mt-48  text-gray-800 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>

        <h2 className="text-3xl font-semibold dark:text-white text-black">
          Oops! Page Not Found
        </h2>
        <p className="text-lg dark:text-white text-black">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/shopingProjectWithApi/"
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
