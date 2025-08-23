import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-card transition-shadow hover:shadow-card-hover dark:border-gray-800 dark:bg-dark-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-4 md:p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('p-4 pt-0 md:p-6 md:pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-4 pt-0 md:p-6 md:pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}