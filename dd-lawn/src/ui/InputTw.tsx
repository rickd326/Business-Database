import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional prop to allow custom classes
  required?: boolean;  // Optional boolean to indicate if the input is required
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, required = false }) => {
  // Default input styling
  const defaultClasses = "inline-block w-1/4 px-4 py-2 mt-2 mx-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring";
  
  // Combine default classes with any custom classes passed via props
  const combinedClasses = `${defaultClasses} ${className || ''}`;

  return (
    <input
      type={type}
      className={combinedClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}  // Apply the required attribute based on the prop
    />
  );
};

export default Input;
