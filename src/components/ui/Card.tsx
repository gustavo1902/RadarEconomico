import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}