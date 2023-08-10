import React from 'react'

type Props = {
  onClick: () => void
}

export default function ButtonNewTransaction({ onClick }: Props) {
  return (
    <button
      className="h-10 w-full rounded-2xl bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
      onClick={onClick}
    >
      Nova transação
    </button>
  )
}
