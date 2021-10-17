import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  DragOverlay,
  defaultDropAnimation,
  DropAnimation,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { useActions, useAppState } from '../../overmind'
import { QuestionSegment } from './boardSegment/QuestionSegment'
import { Question, Segment } from '../../overmind/types'
import { createPortal } from 'react-dom'
import { DroppableSegment } from './boardSegment/DroppableSegment'
import { BoardQuestion } from './boardQuestion/BoardQuestion'

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

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
}

type ActiveId = Segment['id'] | Question['id'] | null

export const Board = () => {
  const { selectedShowSegments, selectedShowSegmentsList } = useAppState()
  const { findSegment, reorderSegment, moveOrReorderQuestion } =
    useActions().builder
  const [activeId, setActiveId] = useState<ActiveId>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const isSortingContainer = activeId
    ? activeId in selectedShowSegmentsList
    : false

  const sensors = useSensors(
    useSensor(PointerSensor)
    // useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [selectedShowSegments])

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
    const overSegment = findSegment(overId)
    const activeSegment = findSegment(active.id)

    if (!overSegment || !activeSegment) {
      return
    }
    if (activeSegment.id !== overSegment.id) {
      let newPosition: number

      if (overSegment.type !== 'QUESTIONS') return

      if (overId in selectedShowSegments) {
        //    Hovering segment, last position in new segment
        newPosition = Object.values(overSegment.questions).length + 1
      } else {
        //    Hovering other question, get position
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.offsetTop >
            over.rect.offsetTop + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newPosition = overSegment.questions[overId].position + modifier
      }

      recentlyMovedToNewContainer.current = true

      moveOrReorderQuestion({
        id: active.id,
        toPosition: newPosition,
        toSegmentId: overSegment.id,
      })
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
    if (overSegment && activeSegment.type === 'QUESTIONS') {
      if (!(active.id in selectedShowSegments)) {
        moveOrReorderQuestion({
          id: active.id,
          toPosition: activeSegment.questions[overId].position,
          toSegmentId: activeSegment.id,
        })
      }
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
                  <DroppableSegment
                    key={segment.id}
                    segmentId={segment.id}
                    isSortingContainer={isSortingContainer}
                  ></DroppableSegment>
                )
              case 'SCORES':
                return null
              default:
                const _exhaustiveCheck: never = segment
                return _exhaustiveCheck
            }
          })}
          {/* {children} */}
        </SortableContext>
      </Segments>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId
            ? activeId in selectedShowSegments
              ? renderSegmentDragOverlay(activeId)
              : renderQuestionDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )

  function renderSegmentDragOverlay(segmentId: string) {
    return (
      <QuestionSegment
        isSortingContainer={true}
        segmentId={segmentId}
        isDragging={false}
        // shadow
      ></QuestionSegment>
    )
  }

  function renderQuestionDragOverlay(questionId: string) {
    const segmentId = findSegment(questionId)?.id

    if (!segmentId) throw new Error()

    return (
      <BoardQuestion
        id={questionId}
        segmentId={segmentId}
        disabled={false}
        isDragging={true}
      />
    )
  }
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
