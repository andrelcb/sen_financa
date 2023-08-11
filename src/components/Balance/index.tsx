"use client"

import { useState } from 'react';

import { currencyFormat } from '@/lib/currencyFormat'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface Props {
  deposit?: number
  withdraw?: number
  totalBalance: number
}

export function Balance(props: Props) {
  const [showTotalBalance, setShowTotalBalance] = useState(false)

  const deposit = props.deposit ?? 0
  const withdraw = props.withdraw ?? 0

  const sum = deposit - withdraw
  const totalPercentage = ((deposit / sum) * 100).toFixed(0)
  const percentageWithdraw = (Number(totalPercentage) - 100) * -1


  const handleShowTotalBalance = () => setShowTotalBalance(!showTotalBalance)

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col justify-between rounded-xl bg-white p-3 shadow-md -mt-5 md:max-w-[458px] ">
      <div className="flex justify-between">
        <div className="relative">
          <p className="ml-5 text-lg font-bold">{currencyFormat(deposit)}</p>
          <span className="absolute block h-2 w-2 rounded-full bg-green-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Entrada</p>
        </div>

        <div className="relative">
          <p className="ml-5 text-lg font-bold">{currencyFormat(withdraw)}</p>
          <span className="absolute block h-2 w-2 rounded-full bg-red-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Saida</p>
        </div>
      </div>
      <div className="flex h-3 mt-3 w-full overflow-hidden rounded-xl">
        <span
          style={{ width: `${totalPercentage}%` }}
          className="block h-3 bg-green-500 "
        ></span>
        <span
          style={{ width: `${percentageWithdraw}%` }}
          className="block h-3 bg-red-500"
        >
        </span>
      </div>

      <div className="flex items-center justify-between text-gray-600 gap-10 mt-8">
        <p className='font-bold'>Total </p>
        <p className="text-lg font-bold items-center">
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
