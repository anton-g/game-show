import { useDrop } from 'react-dnd'

export type DraggedQuestion = {
  id: string
}

type DropProps = {
  hover: ({ id }: DraggedQuestion) => void
  canDrop?: () => boolean
}
export function useQuestionDrop(
  segmentId: string | null,
  { hover, canDrop }: DropProps,
  deps: unknown[] = []
) {
  const [, questionDropArea] = useDrop(
    () => ({
      accept: 'QUESTION',
      canDrop,
      drop() {
        return {
          segmentId,
        }
      },
      hover(item: DraggedQuestion) {
        hover(item)
      },
    }),
    [segmentId, ...deps]
  )

  return questionDropArea
}
