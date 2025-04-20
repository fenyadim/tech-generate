import { Button } from '@/shared/ui'

interface AddProcessGroupProps {
  title: string
  group: string[]
  onAdd: (title: string) => void
}

export const AddProcessGroup = ({ title, group, onAdd }: AddProcessGroupProps) => {
  return (
    <div>
      <p className="text-sm pl-2 font-medium text-gray-600">{title}</p>
      <div className="flex flex-wrap gap-2">
        {group.map((title, index) => (
          <Button
            key={index}
            variant="outline"
            className="rounded-full"
            onClick={() => onAdd(title)}
          >
            {title}
          </Button>
        ))}
      </div>
    </div>
  )
}
