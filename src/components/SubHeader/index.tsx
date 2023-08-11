import { ReactNode } from 'react';

type Props = {
    children?: ReactNode
}

export function SubHeader({ children }: Props) {

    return (
        <div className="flex flex-col gap-5 h-32 w-full bg-blue-900 px-4 items-center md:px-12 justify-center">
            <h1 className='text-white font-bold'>Bem vindo ao SenFinanças</h1>
            {children}
        </div>
    )
}
