module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path to include all your content files
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors here
        'custom-blue': '#007bff',
        'custom-gray': '#f6f6f6',
      },
      spacing: {
        // Define custom spacing values here
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        // Define custom fonts here
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Include any Tailwind plugins you are using here
  ],
  // Enable JIT mode for faster builds and smaller file sizes
  mode: 'jit',
};
