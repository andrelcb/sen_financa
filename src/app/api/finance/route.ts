import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {

  const listFinances = await prisma.financeTransaction.findMany();

  return new NextResponse(JSON.stringify(listFinances), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()

  const { title, amount, category, type } = req

  const newFinance = await prisma.financeTransaction.create({
    data: {
      amount,
      title,
      category,
      type,
    },
  })

  if (!newFinance) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'ERROR_CREATE_FINANCE',
        },
      }),
    )
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      newFinance,
    }),
    { status: 201 },
  )
}
