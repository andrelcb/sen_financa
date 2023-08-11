import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string,
    children: React.ReactNode,
    disabled?: boolean,
    styleButton?: string,
    onClick?: () => void

}

export const Button = ({ color, children, disabled, onClick, styleButton, ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            disabled={disabled}
            className={`flex decoration-transparent hover:opacity-50 ${styleButton && styleButton} gap-2 items-center justify-center px-3 py-2.5 rounded-lg text-sm md:text-base`}
            onClick={onClick}
        >
            {disabled ? 'Carregando...' : children}
        </button>
    )
}