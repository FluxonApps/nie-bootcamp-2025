import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-[#0D1117] border border-[#1F2937] shadow-xl rounded-2xl p-6 text-white ${className}`}
    >
      {children}
    </div>
  );
}

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
  return <div className={className}>{children}</div>;
}
