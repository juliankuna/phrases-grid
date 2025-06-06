import React from "react";
import { Button } from "@atoms/button";

interface ButtonCardProps {
  className?: string;
  ariaLabel: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  className,
  ariaLabel,
  icon,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default ButtonCard;
