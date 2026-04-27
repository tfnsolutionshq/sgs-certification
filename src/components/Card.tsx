import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onCardClick?: () => void;
}

export default function Card({
  children,
  className = "",
  onCardClick,
}: CardProps) {
  return (
    <div
      className={`bg-card rounded-xl border border-gray-200 shadow-sm ${className}`}
      onClick={onCardClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
