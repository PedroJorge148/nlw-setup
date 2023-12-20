import { zodResolver } from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Saábado',
]

const newHabitFormSchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)),
})

type NewHabitFormInputs = z.infer<typeof newHabitFormSchema>

export function NewHabitForm() {
  const { register, handleSubmit } = useForm<NewHabitFormInputs>({
    resolver: zodResolver(newHabitFormSchema),
  })

  function handleCreateNewHabit(data: NewHabitFormInputs) {
    console.log(data)
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
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        {...register('title')}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
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
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
