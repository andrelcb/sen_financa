import { ComponentPropsWithoutRef, LegacyRef, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  errorMessage?: string
  icon?: ReactNode
}

function Input(
  { className, error, errorMessage, icon, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) {
  const inputClassName = twMerge(
    `h-10 w-full rounded-md bg-[#fff] ${icon ? 'pl-10' : 'pl-4'} border border-gray-200 outline-none`,
    error ? 'border-2 border-red-500' : 'focus:ring-1 focus:ring-primary',
    className,
  )

  return (
    <div className="flex w-full flex-col">
      <div className='flex items-center gap-2 relative'>
        <input ref={ref} className={inputClassName} {...props} />
        <span className='absolute left-3 text-gray-400'>
          {icon && icon}
        </span>
      </div>
      {error && errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}

export default forwardRef(Input)
