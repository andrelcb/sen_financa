"use client"

import { Finance } from "@/types/finance"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { FinanceContext } from "./FinanceContexts"

interface ContextProps {
    children: ReactNode
}

interface CreateFinanceProps extends Omit<Finance, 'id' | 'createdAt'> { }

export function FinanceProvider({ children }: ContextProps) {
    const [financeList, setFinanceList] = useState<Finance[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getFinanceList()
    }, [])

    const getFinanceList = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get('/api/finance')
            console.log(data);
            setFinanceList(data)
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
                setFinanceList,
                getFinanceList,
                createFinance,
                deleteFinance,
                isLoading,
            }}
        >
            {children}
        </FinanceContext.Provider>
    )
}
