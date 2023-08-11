import Image from 'next/image'
import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import CurrencyInput from '@/components/CurrencyInput'
import Input from '@/components/Input'
import { toast } from 'react-toastify'
import { FinanceContext } from '@/contexts/finance/FinanceContexts'
import { Finance } from '@/types/finance'
import { BiLoaderCircle } from 'react-icons/bi'
import { Button } from '../Button'

interface Props {
  isOpen: boolean
  handleCloseNewTransaction: () => void
}

interface FormInput extends Omit<Finance, 'id' | 'createdAt'> { }

export function NewTransaction(props: Props) {
  const { createFinance, isLoading } = useContext(FinanceContext)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      type: 'deposit',
    },
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const formatNumber = String(data.amount).replace(',', '.')
      const body = {
        ...data,
        amount: Number(formatNumber),
      }
      await createFinance(body)
      onClose()
      toast.success('Transação criada com sucesso.')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar nova transação, tente novamente.')
    }
  }

  const type = watch('type')

  function isActive(value: 'deposit' | 'withdraw') {
    return type === value
  }

  function onClose() {
    reset()
    props.handleCloseNewTransaction()
  }

  return props.isOpen ? (
    <div className="fixed top-0 flex h-screen w-full items-center justify-center bg-slate-50 bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[580px] min-h-[500px] w-[500px] rounded-2xl bg-white px-6 py-5 shadow-lg"
      >
        <div className="flex items-center gap-2 font-semibold">
          {/* <Image src={CardSVG} alt="card" /> */}
          <p>Cadastrar nova transação</p>
        </div>

        <Input
          error={!!errors?.title}
          errorMessage={errors?.title?.message}
          placeholder="Titulo"
          {...register('title', {
            required: {
              value: true,
              message: 'Título é obrigatório.',
            },
          })}
        />

        <Controller
          name="amount"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Valor é obrigatório.',
            },
          }}
          render={({ field, fieldState, formState }) => (
            <CurrencyInput
              placeholder="Valor"
              onValueChange={field.onChange as any}
              value={field.value}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              errorMessage={formState.errors.amount?.message}
            />
          )}
        />

        <div className="mt-6 flex items-center justify-around ">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={`flex h-20 w-20 items-center justify-center rounded-full  transition-colors hover:opacity-80
              ${isActive('deposit') ? 'bg-green-300' : 'bg-[#E8E8F0]'}
              `}
              onClick={() => setValue('type', 'deposit')}
            >
              {/* <Image src={IncomeSVG} alt="Entrada" /> */}
            </button>
            <p className="text-gray-600">Entrada</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors hover:opacity-80
              ${isActive('withdraw') ? 'bg-red-300' : 'bg-[#E8E8F0]'}
              `}
              onClick={() => setValue('type', 'withdraw')}
            >
              {/* <Image src={OutcomeSVG} alt="Saída" /> */}
            </button>
            <p className="text-gray-600">Saída</p>
          </div>
        </div>

        <Input
          error={!!errors?.category}
          errorMessage={errors?.category?.message}
          placeholder="Categoria"
          {...register('category', {
            required: {
              value: true,
              message: 'Categoria é obrigatório.',
            },
          })}
        />

        <div className='flex gap-2 items-center mt-10'>
          <Button
            type="button"
            styleButton="mx-auto block h-10 w-[244px] bg-gray-200 font-semibold"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button styleButton="mx-auto flex h-10 w-[244px] items-center justify-center bg-blue-600 font-semibold text-white">
            {isLoading ? <BiLoaderCircle className="animate-spin" /> : 'Nova transação'}
          </Button>
        </div>
      </form>
    </div>
  ) : null
}
