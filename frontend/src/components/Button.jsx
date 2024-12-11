import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  // Tailwind sınıfları için varyantlara göre dinamik stiller
  const baseStyles = 'py-2 px-4 font-semibold rounded focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light',
    secondary: 'bg-secondary text-primary-dark hover:bg-secondary-dark focus:ring-secondary-light',
    accent: 'bg-accent text-white hover:bg-primary-dark focus:ring-accent',
  };

  // Buton stili
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const activeStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${activeStyles} ${disabled ? disabledStyles : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
