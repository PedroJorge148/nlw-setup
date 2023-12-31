interface ProgressBraProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBraProps) {
  const progressStyles = {
    width: `${progress}%`,
  }

  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={75}
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={progressStyles}
      />
    </div>
  )
}
