import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string
}

export const Button = ({ title, className = '', ...rest }: ButtonProps) => (
  <button
    className={`glass rounded-full px-5 py-2 font-mono text-sm text-fg transition-colors hover:text-accent ${className}`}
    {...rest}
  >
    {title}
  </button>
)
