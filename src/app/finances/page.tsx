"use client"

import { Balance } from '@/components/Balance'
import { Button } from '@/components/Button'
import { FinanceTable } from '@/components/FinaceTable'
import Header from '@/components/Header'
import Input from '@/components/Input'
import { NewTransaction } from '@/components/NewTransaction'
import { FinanceContext } from '@/contexts/FinanceContextType'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { BsSearch } from 'react-icons/bs'
import { Finance } from '@/types/finance'
import { BiFilter } from 'react-icons/bi'
import Select from '@/components/Select'
import { OptionsType } from '@/utils/OptionsType'
import Loading from '@/components/Loading'
import { SubHeader } from '@/components/SubHeader'

export default function Home() {
  const { financeList, isLoading, deleteFinance, setFinanceList, financeListFiltered, setFinanceListFiltered } = useContext(FinanceContext)
  const [financeEdit, setFinanceEdit] = useState<Finance>();
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    typeFilter: '',
    categoryFilter: '',
    tituloFilter: '',
  })

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleOpenNewTransaction = () => {
    setFinanceEdit(undefined);
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

  const handleSearchClick = () => {
    let filteredList = financeList;

    if (filters.tituloFilter !== "") {
      filteredList = filteredList.filter(item =>
        item.title.toLowerCase().includes(filters.tituloFilter.toLowerCase())
      );
    }

    if (filters.categoryFilter !== "") {
      filteredList = filteredList.filter(item =>
        item.category.toLowerCase().includes(filters.categoryFilter.toLowerCase())
      );
    }

    if (filters.typeFilter !== "") {
      filteredList = filteredList.filter(item =>
        item.type === filters.typeFilter
      );
    }

    setFinanceListFiltered(filteredList);
  }

  const editFinance = (finance: Finance) => {
    setFinanceEdit(finance);
    setIsOpen(true);
  }

  const totalBalance = financeListFiltered?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum - item.amount
  }, 0)

  const totalDeposit = financeListFiltered?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum
  }, 0)

  const totalWithdraw = financeListFiltered?.reduce((sum, item) => {
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
      <SubHeader />
      <Balance
        totalBalance={totalBalance}
        deposit={totalDeposit}
        withdraw={totalWithdraw}
      />

      <div className='max-w-5xl mx-auto mt-10'>
        <div className='flex flex-col gap-2 px-4 border-1 p-5 rounded-md bg-white'>
          <h3 className='text-gray-400 text-3xl flex items-center gap-2'>
            Filtros <BiFilter />
          </h3>

          <div className='flex flex-col gap-4'>
            <Input
              value={filters.tituloFilter}
              onChange={e => handleFilterChange('tituloFilter', e.target.value)}
              icon={<BsSearch size={20} />}
              placeholder='Digite um titulo'
            />
            <Input
              value={filters.categoryFilter}
              onChange={e => handleFilterChange('categoryFilter', e.target.value)}
              icon={<BsSearch size={20} />}
              placeholder='Digite uma categoria'
            />

            <Select
              value={filters.typeFilter}
              onChange={e => handleFilterChange('typeFilter', e.target.value)}
              options={OptionsType}
              icon={<BsSearch size={20} />}
            />
          </div>

          <Button styleButton='bg-orange-600 text-white w-full  mt-5' onClick={handleSearchClick}>
            Buscar
          </Button>
        </div>
        <div className="mt-5 max-h-[800px] w-full mx-auto">
          <FinanceTable
            editFinance={editFinance}
            finance={financeListFiltered}
            onDelete={(value: string) => handleDelete(value)}
          />
        </div>
      </div>
      <NewTransaction
        finance={financeEdit}
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
      />
      <Loading isLoading={isLoading} />
    </main>
  )
}
