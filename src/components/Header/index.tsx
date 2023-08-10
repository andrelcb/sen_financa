import React, { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

export default function Header({ children }: Props) {
  return (
    <header className="flex justify-between px-4 py-5 md:px-12">
       <b><span className='text-orange-600'>Sen</span><span className='text-blue-900'>Finanças</span></b>
      {children}
    </header>
  )
}
