import { FinanceProvider } from '@/contexts/finance/FInanceProvider'
import { ReactNode } from 'react'


export default function RootLayout({ children }: { children: ReactNode }) {
  return <FinanceProvider>{children}</FinanceProvider>
}
