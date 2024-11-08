import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="text-6xl font-extrabold text-red-600">404</div>
      <h1 className="mt-4 text-2xl sm:text-3xl text-gray-800">Oops! Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600">
        The page you're looking for might have been moved or doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
