import ButtonNewTransaction from '@/components/ButtonNewTransaction'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E5E5] pb-20">
      <Header>
        <div className="flex items-center gap-4">
          <ButtonNewTransaction onClick={console.log('teste')} />
        </div>
      </Header>
    </main>
  )
}
