import _CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import { twMerge } from 'tailwind-merge'

interface InputProps extends CurrencyInputProps {
  error?: boolean
  errorMessage?: string
}

function CurrencyInput({
  className,
  error,
  errorMessage,
  ...props
}: InputProps) {
  const inputClassName = twMerge(
    'mt-5 h-10 w-full rounded-md bg-[#fff] pl-4 border border-gray-200 outline-none',
    error ? 'border-2 border-red-500' : '',
    className,
  )

  return (
    <div className="flex w-full flex-col">
      <_CurrencyInput
        lang="pt-BR"
        className={inputClassName}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        {...props}
      />
      {error && errorMessage && (
        <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  )
}

export default CurrencyInput
