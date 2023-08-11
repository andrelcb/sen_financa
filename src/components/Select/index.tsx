import { Options } from '@/types/Options';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'select'> {
    icon?: ReactNode,
    options: Options[];
}

function Select(
    { className, icon, options, ...props }: InputProps, ref: React.Ref<HTMLSelectElement> | undefined,
) {

    return (
        <div className="flex w-full flex-col">
            <div className='flex items-center gap-2 relative'>
                <select ref={ref} {...props} className={`h-10 w-full rounded-md bg-[#fff] ${icon ? 'pl-10' : 'pl-4'} border border-gray-200 outline-none`}>
                    {options.map((item) => (
                        <option key={item.text + item.value} value={item.value}>{item.text}</option>
                    ))}
                </select>
                <span className='absolute left-3 text-gray-400'>
                    {icon && icon}
                </span>
            </div>
        </div>
    )
}

export default forwardRef(Select)
