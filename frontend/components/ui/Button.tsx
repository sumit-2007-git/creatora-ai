import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; size?: "default" | "small"; children: ReactNode };
export function Button({ variant = "primary", size = "default", className = "", children, ...props }: Props) {
  return <button className={`button ${variant === "secondary" ? "secondary" : ""} ${size === "small" ? "small" : ""} ${className}`} {...props}>{children}</button>;
}
