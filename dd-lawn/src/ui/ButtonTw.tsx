interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset"; // Optional, for form buttons
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = "button" }) => {
  // Default styles for the button
  const baseClasses = "px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-700 hover:bg-blue-500 text-white";

  // Combine default classes with any custom classes passed via props
  const buttonClasses = `${baseClasses} ${className}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
