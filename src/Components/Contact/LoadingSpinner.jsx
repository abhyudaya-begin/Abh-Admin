// src/components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10 bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
    </div>
  );
};

export default LoadingSpinner;


