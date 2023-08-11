'use client'

import { currencyFormat } from '@/lib/currencyFormat'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

interface Props {
  totalBalance: number
}

export function TotalBalance(props: Props) {
  const [showTotalBalance, setShowTotalBalance] = useState(false)

  const handleShowTotalBalance = () => setShowTotalBalance(!showTotalBalance)

  return (
    <div className="flex flex-col h-32 w-full bg-blue-900 px-4 items-center md:px-12 justify-center">
      <p className='text-white font-bold'>Total </p>
      <div className="flex items-center justify-between text-white gap-10 mt-2">
        <p className="text-lg font-bold text-white items-center">
          {showTotalBalance ? 'R$ *******' : currencyFormat(props.totalBalance)}
        </p>
        <button
          className="transition-opacity hover:opacity-70"
          onClick={handleShowTotalBalance}
        >
          {showTotalBalance ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
        </button>
      </div>
    </div>
  )
}
