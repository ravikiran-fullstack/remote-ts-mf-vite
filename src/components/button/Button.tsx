import React from 'react';

type ButtonProps = {
  size: 'small' | 'large';
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return <button>Remote App Large Button</button>;
  }
  return <button>Remote App Small Button</button>;
};

export default Button;
