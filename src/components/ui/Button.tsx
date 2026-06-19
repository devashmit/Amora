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
      'bg-amora-rose hover:bg-amora-rose/95 text-white shadow-md hover:shadow-lg focus:ring-amora-rose',
    secondary:
      'bg-amora-gold hover:bg-amora-gold/95 text-white shadow-md hover:shadow-lg focus:ring-amora-gold',
    outline:
      'border-2 border-amora-ink/20 hover:border-amora-ink/50 text-amora-ink hover:bg-amora-ink/5 focus:ring-amora-ink',
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
