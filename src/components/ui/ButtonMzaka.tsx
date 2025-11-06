import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonMzakaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const ButtonMzaka: React.FC<ButtonMzakaProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Classes de base
  const baseClasses = `
    font-body font-semibold rounded-organic-lg 
    transition-all duration-200 ease-in-out
    touch-target flex items-center justify-center gap-3
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:translate-y-[-1px] active:translate-y-0
  `;

  // Classes de taille
  const sizeClasses = {
    sm: 'px-4 py-2 text-base min-h-touch-sm',
    md: 'px-6 py-3 text-lg min-h-touch',
    lg: 'px-8 py-4 text-lg min-h-touch-sm',
    xl: 'px-10 py-5 text-xl min-h-touch-md',
  };

  // Classes de variante
  const variantClasses = {
    primary: `
      bg-burkina-red text-white border-2 border-burkina-red
      shadow-red hover:bg-burkina-red-600 hover:shadow-red-lg
      focus:ring-burkina-red
    `,
    secondary: `
      bg-sahel-green text-white border-2 border-sahel-green
      shadow-green hover:bg-sahel-green-600 hover:shadow-green-lg
      focus:ring-sahel-green
    `,
    accent: `
      bg-sun-gold text-earth-dark border-2 border-sun-gold
      shadow-gold hover:bg-sun-gold-600 hover:shadow-gold-lg
      hover:text-white focus:ring-sun-gold
    `,
    outline: `
      bg-transparent text-burkina-red border-2 border-burkina-red
      hover:bg-burkina-red hover:text-white
      focus:ring-burkina-red
    `,
    ghost: `
      bg-transparent text-burkina-red border-2 border-transparent
      hover:bg-burkina-red-50 hover:border-burkina-red-200
      focus:ring-burkina-red
    `,
  };

  // Classes de largeur
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';

  // Classes finales
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClasses}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span className="flex-1 text-center">{children}</span>
    </button>
  );
};

export default ButtonMzaka;