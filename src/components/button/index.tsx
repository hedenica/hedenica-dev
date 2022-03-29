import { HTMLAttributes } from 'react'
import styles from './button.module.css'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button
     className={styles.button}
     {...rest}
    >
      {title}
    </button>
  )
}