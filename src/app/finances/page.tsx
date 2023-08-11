"use client"

import { Balance } from '@/components/Balance'
import { Button } from '@/components/Button'
import { FinanceTable } from '@/components/FinaceTable'
import Header from '@/components/Header'
import { NewTransaction } from '@/components/NewTransaction'
import { TotalBalance } from '@/components/TotalBalance/ProfileInfo'
import { FinanceContext } from '@/contexts/finance/FinanceContexts'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  const { financeList, isLoading, deleteFinance } = useContext(FinanceContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenNewTransaction = () => {
    setIsOpen(true)
  }

  const handleCloseNewTransaction = () => {
    setIsOpen(false)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFinance(id)
      toast.success('Transação deletada com sucesso.')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao deletar transação, tente novamente.')
    }
  }

  const totalBalance = financeList?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum - item.amount
  }, 0)

  const totalDeposit = financeList?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum
  }, 0)

  const totalWithdraw = financeList?.reduce((sum, item) => {
    return item.type === 'withdraw' ? sum - item.amount : sum
  }, 0)

  return (
    <main className="min-h-screen bg-[#E5E5E5] pb-20">
      <Header>
        <div className="flex items-center gap-4">
          <Button
            styleButton='bg-orange-600 text-white'
            onClick={handleOpenNewTransaction}>
            Nova transação
          </Button>
        </div>
      </Header>

      <TotalBalance totalBalance={totalBalance} />
      <Balance deposit={totalDeposit} withdraw={totalWithdraw} />

      <div className="mt-5 max-h-[520px] w-full overflow-y-scroll md:mt-10">
        <FinanceTable
          finance={financeList}
          onDelete={(value: string) => handleDelete(value)}
        />
      </div>
      <NewTransaction
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
      />
    </main>
  )
}
