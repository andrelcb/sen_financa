import Image from 'next/image'
import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import CurrencyInput from '@/components/CurrencyInput'
import Input from '@/components/Input'
import { toast } from 'react-toastify'
import { FinanceContext } from '@/contexts/finance/FinanceContextType'
import { Finance } from '@/types/finance'
import { BiLoaderCircle } from 'react-icons/bi'
import { Button } from '../Button'
import Select from '../Select'

interface Props {
  isOpen: boolean
  finance?: Finance
  handleCloseNewTransaction: () => void
}

interface FormInput extends Omit<Finance, 'id' | 'createdAt'> { }

const Options = [
  { value: "deposit", text: 'Entrada' },
  { value: "withdraw", text: 'Saida' }
]

export function NewTransaction(props: Props) {
  const { createFinance, updateFinance, isLoading } = useContext(FinanceContext)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const formatNumber = String(data.amount).replace(',', '.')
      const body = {
        ...data,
        amount: Number(formatNumber),
      }
      if (props.finance?.id) {
        const bodyEdit = {
          ...body,
          id: props.finance.id,
        }
        await updateFinance(bodyEdit)
      } else {
        await createFinance(body)
      }
      onClose()
      toast.success('Transação atualizada com sucesso.')
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
        className="max-h-[580px] min-h-[500px] w-[420px] rounded-2xl bg-white px-6 py-5 shadow-lg"
      >
        <div className="flex items-center gap-2 font-semibold mb-4">
          {/* <Image src={CardSVG} alt="card" /> */}
          {props.finance &&
            <p>Editar transação</p>
          }
          {!props.finance &&
            <p>Cadastrar nova transação</p>
          }
        </div>

        <div className='flex flex-col gap-5'>
          <Input
            error={!!errors?.title}
            defaultValue={props.finance?.title}
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
            defaultValue={props.finance?.amount}
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

          <Select
            defaultValue={props.finance?.type}
            options={Options}
            {...register('type', {
              required: {
                value: true,
                message: 'O tipo é obrigatório.',
              },
            })}
          />

          <Input
            error={!!errors?.category}
            defaultValue={props.finance?.category}
            errorMessage={errors?.category?.message}
            placeholder="Categoria"
            {...register('category', {
              required: {
                value: true,
                message: 'Categoria é obrigatório.',
              },
            })}
          />
        </div>

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
