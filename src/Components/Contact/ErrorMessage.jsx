import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-center py-10 bg-gray-900">
      <p className="text-red-400 font-medium">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;