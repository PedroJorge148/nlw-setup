import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/Checkbox";

interface HabitProps {
  date: string
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as HabitProps

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20}}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <CheckBox 
            title="Beber 2L de água" 
            checked={false}
          />
          <CheckBox 
            title="Caminhar" 
            checked={true}
          />
        </View>

      </ScrollView>
    </View>
  )
}