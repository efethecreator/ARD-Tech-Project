import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  // Tailwind sınıfları için varyantlara göre dinamik stiller
  const baseStyles = 'py-2 px-4 font-semibold rounded focus:outline-none focus:ring transition-all ease-in-out';
  
  const variants = {
    primary: 'bg-[#5E503F] text-[#F2F4F3] hover:bg-[#A9927D] focus:ring-[#22333B]',
    secondary: 'bg-[#A9927D] text-[#0A0908] hover:bg-[#F2F4F3] focus:ring-[#5E503F]',
    accent: 'bg-[#22333B] text-[#F2F4F3] hover:bg-[#0A0908] focus:ring-[#A9927D]',
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
