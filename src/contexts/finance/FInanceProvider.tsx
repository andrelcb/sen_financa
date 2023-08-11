"use client"

import { Finance } from "@/types/finance"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { FinanceContext } from "./FinanceContexts"

interface ContextProps {
    children: ReactNode
}

interface CreateFinanceProps extends Omit<Finance, 'id' | 'createdAt'> { }
interface UpdateFinanceProps extends Omit<Finance, 'createdAt'> { }

export function FinanceProvider({ children }: ContextProps) {
    const [financeList, setFinanceList] = useState<Finance[]>([])
    const [financeListFiltered, setFinanceListFiltered] = useState<Finance[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getFinanceList()
    }, [])

    const getFinanceList = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get('/api/finance')
            setFinanceList(data)
            setFinanceListFiltered(data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const createFinance = async (body: CreateFinanceProps) => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('/api/finance', {
                ...body,
            })

            setFinanceList([...financeList, data?.newFinance])
            setFinanceListFiltered([...financeList, data?.newFinance])
        } catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const updateFinance = async (body: UpdateFinanceProps) => {
        try {
            setIsLoading(true)
            const { data } = await axios.put('/api/finance', {
                ...body,
            })

            getFinanceList();
        } catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const deleteFinance = async (financeId: string) => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/finance/${financeId}`)

            const updateList = financeList.filter(
                (finance) => finance.id !== financeId,
            )
            setFinanceList(updateList)
            setFinanceListFiltered(updateList)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <FinanceContext.Provider
            value={{
                financeList,
                financeListFiltered,
                setFinanceListFiltered,
                setFinanceList,
                getFinanceList,
                createFinance,
                updateFinance,
                deleteFinance,
                isLoading,
            }}
        >
            {children}
        </FinanceContext.Provider>
    )
}
