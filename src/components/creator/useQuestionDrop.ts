import { useDrop } from 'react-dnd'

export type DraggedQuestion = {
  id: string
}

type DropProps = {
  hover: ({ id }: DraggedQuestion) => void
}
export function useQuestionDrop(
  segmentId: string | null,
  { hover }: DropProps
) {
  const [, questionDropArea] = useDrop(() => ({
    accept: 'QUESTION',
    drop() {
      return {
        segmentId,
      }
    },
    hover(item: DraggedQuestion) {
      hover(item)
    },
  }))

  return questionDropArea
}
