import { FinanceProvider } from '@/contexts/finance/FinanceProvider'
import { ReactNode } from 'react'


export default function RootLayout({ children }: { children: ReactNode }) {
  return <FinanceProvider>{children}</FinanceProvider>
}
