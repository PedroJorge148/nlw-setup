import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const newHabitFormSchema = z.object({
  title: z.string(),
  // weekDays: z.array(z.number().min(0).max(6)),
})

type NewHabitFormInputs = z.infer<typeof newHabitFormSchema>

interface NewHabitFormProps {
  onOpenChange: () => void
}

export function NewHabitForm({ onOpenChange }: NewHabitFormProps) {
  const { register, handleSubmit, reset } = useForm<NewHabitFormInputs>({
    resolver: zodResolver(newHabitFormSchema),
  })

  const [weekDays, setWeekDays] = useState<number[]>([])

  async function handleCreateNewHabit({ title }: NewHabitFormInputs) {
    if (weekDays.length === 0) {
      return 0
    }

    const response = await api.post('habits', {
      title,
      weekDays,
    })

    if (response.status === 201) {
      reset()
      setWeekDays([])

      alert('Hábito criado com sucesso!')
      onOpenChange()
    } else {
      alert('Ocorreu um erro.')
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithoutRemovedOne = weekDays.filter(
        (day) => day !== weekDay,
      )

      setWeekDays(weekDaysWithoutRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewHabit)}
      className="w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        {...register('title')}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, i) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none"
              onCheckedChange={() => handleToggleWeekDay(i)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="leading-tight">{weekDay}</span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
