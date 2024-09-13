import React from 'react';

interface StyledSectionProps {
  title: string;
  children: React.ReactNode;
  isTable?: boolean; // Optional prop to indicate table-specific styling
}

const StyledSection: React.FC<StyledSectionProps> = ({ title, children, isTable = false }) => {
  const baseClasses = "p-5 bg-white shadow-md rounded-lg";
  const tableClasses = isTable ? "p-0" : ""; // Remove padding if it's a table

  return (
    <div className={`${baseClasses} ${tableClasses}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// Corrected export statement
export default StyledSection;
