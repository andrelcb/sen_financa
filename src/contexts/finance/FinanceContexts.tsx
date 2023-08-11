'use client'

import { Finance } from '@/types/finance'
import axios from 'axios'
import { createContext, useState, ReactNode, useEffect } from 'react'

interface CreateFinanceProps extends Omit<Finance, 'id' | 'createdAt'> {}

interface FinanceContextType {
  financeList: Finance[]
  setFinanceList: (value: Finance[]) => void
  getFinanceList: () => Promise<void>
  createFinance: (value: CreateFinanceProps) => Promise<void>
  deleteFinance: (value: string) => Promise<void>
  isLoading: boolean
}

export const FinanceContext = createContext({} as FinanceContextType)