import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  useSensors,
  useSensor,
  PointerSensor,
  closestCenter,
  DndContext,
  DragEndEvent,
  MeasuringStrategy,
  DragStartEvent,
  DragOverEvent,
  rectIntersection,
  CollisionDetection,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { useActions, useAppState } from '../../overmind'
import { QuestionSegment } from './boardSegment/QuestionSegment'
import { ScoreSegment } from './boardSegment/ScoreSegment'
import { Question, Segment } from '../../overmind/types'

export type DraggedQuestion = {
  id: string
  originalPosition: number
}

export type DraggedSegment = {
  id: string
  originalPosition: number
}

export enum DRAG_TYPES {
  QUESTION = 'QUESTION',
  SEGMENT = 'SEGMENT',
}

type ActiveId = Segment['id'] | Question['id'] | null

export const Board = () => {
  const { selectedShowSegments, selectedShowSegmentsList } = useAppState()
  const { findSegment, reorderSegment } = useActions().builder
  const [activeId, setActiveId] = useState<ActiveId>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)

  const sensors = useSensors(
    useSensor(PointerSensor)
    // useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const collisionDetectionStrategy = useCustomCollisionDetection(
    selectedShowSegments,
    activeId,
    lastOverId,
    recentlyMovedToNewContainer
  )

  const handleDragCancel = () => {}
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    // setClonedItems(items);
  }
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (
      !overId ||
      // || overId === TRASH_ID
      active.id in selectedShowSegments
    ) {
      return
    }
    // const overContainer = findContainer(overId)
    const overSegment = findSegment(overId).segment
    // const activeContainer = findContainer(active.id)
    const activeSegment = findSegment(active.id).segment

    // if (!overContainer || !activeContainer) {
    //   return
    // }
    if (!overSegment || !activeSegment) {
      return
    }
    // if (activeContainer !== overContainer) {
    if (activeSegment.id !== overSegment.id) {
      // setItems((items) => {
      //   const activeItems = items[activeContainer]
      //   const overItems = items[overContainer]
      //   const overIndex = overItems.indexOf(overId)
      //   const activeIndex = activeItems.indexOf(active.id)
      //   let newIndex: number
      //   if (overId in items) {
      //     newIndex = overItems.length + 1
      //   } else {
      //     const isBelowOverItem =
      //       over &&
      //       active.rect.current.translated &&
      //       active.rect.current.translated.offsetTop >
      //         over.rect.offsetTop + over.rect.height
      //     const modifier = isBelowOverItem ? 1 : 0
      //     newIndex =
      //       overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      //   }
      //   recentlyMovedToNewContainer.current = true
      //   return {
      //     ...items,
      //     [activeContainer]: items[activeContainer].filter(
      //       (item) => item !== active.id
      //     ),
      //     [overContainer]: [
      //       ...items[overContainer].slice(0, newIndex),
      //       items[activeContainer][activeIndex],
      //       ...items[overContainer].slice(
      //         newIndex,
      //         items[overContainer].length
      //       ),
      //     ],
      //   }
      // })
      // }
    }
  }
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in selectedShowSegments && over?.id) {
      reorderSegment({
        segmentId: active.id,
        toPosition: selectedShowSegments[over.id].position, // TODO refactor
      })
    }

    const activeSegment = findSegment(active.id)

    if (!activeSegment) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (!overId) {
      setActiveId(null)
      return
    }

    // if (overId === TRASH_ID) {
    //   setItems((items) => ({
    //     ...items,
    //     [activeContainer]: items[activeContainer].filter(
    //       (id) => id !== activeId
    //     ),
    //   }))
    //   setActiveId(null)
    //   return
    // }

    // if (overId === PLACEHOLDER_ID) {
    //   const newContainerId = getNextContainerId()

    //   unstable_batchedUpdates(() => {
    //     setContainers((containers) => [...containers, newContainerId])
    //     setItems((items) => ({
    //       ...items,
    //       [activeContainer]: items[activeContainer].filter(
    //         (id) => id !== activeId
    //       ),
    //       [newContainerId]: [active.id],
    //     }))
    //     setActiveId(null)
    //   })
    //   return
    // }

    const overSegment = findSegment(overId)

    // === moving question?
    if (overSegment) {
      // const activeIndex = items[activeSegment].indexOf(active.id)
      // const overIndex = items[overSegment].indexOf(overId)
      // if (activeIndex !== overIndex) {
      //   setItems((items) => ({
      //     ...items,
      //     [overSegment]: arrayMove(items[overSegment], activeIndex, overIndex),
      //   }))
      // }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      // cancelDrop={cancelDrop}
      // modifiers={modifiers}
    >
      <Segments>
        <SortableContext
          items={selectedShowSegmentsList}
          strategy={horizontalListSortingStrategy}
        >
          {selectedShowSegmentsList.map((segment) => {
            switch (segment.type) {
              case 'QUESTIONS':
                return (
                  <QuestionSegment
                    key={segment.id}
                    segmentId={segment.id}
                  ></QuestionSegment>
                )
              case 'SCORES':
                return (
                  <ScoreSegment
                    key={segment.id}
                    segmentId={segment.id}
                  ></ScoreSegment>
                )
              default:
                const _exhaustiveCheck: never = segment
                return _exhaustiveCheck
            }
          })}
          {/* {children} */}
        </SortableContext>
      </Segments>
    </DndContext>
  )
}

function SegmentPlaceholder() {
  const { addSegment } = useActions().builder

  return (
    <Wrapper>
      <MockSegmentButton onClick={addSegment}>New segment</MockSegmentButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 300px;
  padding-right: 60px;
  padding-top: 20px;
`

const MockSegmentButton = styled.button`
  background: none;
  border: 2px dashed hsl(0 0% 90%);
  color: hsl(0 0% 40%);
  border-radius: 8px;
  font-size: 20px;
  padding: 8px 16px;
  text-align: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: hsl(0 0% 98%);
    border-color: hsl(0 0% 80%);
  }
`

const Segments = styled.div`
  display: flex;
  height: 100%;
  overflow-x: scroll;

  > * {
    margin-left: 16px;
  }
`

function useCustomCollisionDetection(
  selectedShowSegments: Record<string, Segment>,
  activeId: ActiveId,
  lastOverId: React.MutableRefObject<string | null>,
  recentlyMovedToNewContainer: React.MutableRefObject<boolean>
) {
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      let overId = rectIntersection(args)

      if (activeId && activeId in selectedShowSegments) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in selectedShowSegments
          ),
        })
      }

      if (overId != null) {
        // if (overId === TRASH_ID) {
        //   // If the intersecting droppable is the trash, return early
        //   // Remove this if you're not using trashable functionality in your app
        //   return overId
        // }

        if (overId in selectedShowSegments) {
          const segment = selectedShowSegments[overId]

          // If a container is matched and it contains items
          if (
            'questions' in segment &&
            Object.values(segment.questions).length > 0
          ) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && selectedShowSegments[container.id]
              ),
            })
          }
        }

        lastOverId.current = overId

        return overId
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current
    },
    [activeId, lastOverId, recentlyMovedToNewContainer, selectedShowSegments]
  )

  return collisionDetectionStrategy
}
