import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-[#D6707C] hover:bg-[#C95F6B] text-white focus:ring-[#D6707C] shadow-editorial-sm hover:shadow-editorial-md transition-colors',
    secondary:
      'border border-[#A88756] text-[#A88756] hover:bg-[#A88756]/5 focus:ring-[#A88756] transition-all',
    outline:
      'border border-[#A88756] text-[#A88756] hover:bg-[#A88756]/5 focus:ring-[#A88756] transition-all',
    ghost:
      'text-amora-ink/80 hover:text-amora-ink hover:bg-amora-ink/5 focus:ring-amora-ink',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
