"use client"

import { Balance } from '@/components/Balance'
import { Button } from '@/components/Button'
import { FinanceTable } from '@/components/FinaceTable'
import Header from '@/components/Header'
import { NewTransaction } from '@/components/NewTransaction'
import { SubHeader } from '@/components/SubHeader'
import { FinanceContext } from '@/contexts/finance/FinanceContexts'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E5E5] pb-20">
      <Header>
        <div className="flex items-center gap-4">
          <FaUserCircle size={35} className="text-blue-900" />
        </div>
      </Header>

      <SubHeader>
        <div className="flex items-center justify-between text-white gap-10 mt-2">
          <Link href={'/finances'}>
            <Button styleButton='bg-orange-600 text-white'>
              Faça uma nova transação
            </Button>
          </Link>
        </div>
      </SubHeader>

    </main>
  )
}
