import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  useDroppable,
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
import { isQuestionSegment } from '../../utils/type-utils'
import { ScoreSegment } from './boardSegment/ScoreSegment'
import { TrashIcon } from '@radix-ui/react-icons'

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
  dragSourceOpacity: 0.2,
}

type ActiveId = Segment['id'] | Question['id'] | null

export const TRASH_ID = 'void'

export const Board = () => {
  const { selectedShowSegments, selectedShowSegmentsList } = useAppState()
  const {
    findSegment,
    reorderSegment,
    moveOrReorderQuestion,

    removeSegmentQuestion,
  } = useActions().builder
  const [activeId, setActiveId] = useState<ActiveId>(null)
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
    recentlyMovedToNewContainer
  )

  const handleDragCancel = () => {
    setActiveId(null)
  }
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    // setClonedItems(items);
  }
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (!overId || overId === TRASH_ID || active.id in selectedShowSegments) {
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

      moveOrReorderQuestion({
        id: active.id,
        toPosition: newPosition,
        toSegmentId: overSegment.id,
      })

      recentlyMovedToNewContainer.current = true
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

    if (overId === TRASH_ID) {
      removeSegmentQuestion({
        segmentId: activeSegment.id,
        questionId: active.id,
      })
      setActiveId(null)
      return
    }

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

  const segmentIds = useMemo(
    () => selectedShowSegmentsList.map((x) => x.id),
    [selectedShowSegmentsList]
  )

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
    >
      <Segments>
        <SortableContext
          items={segmentIds}
          strategy={horizontalListSortingStrategy}
        >
          {selectedShowSegmentsList.map((segment) => (
            <DroppableSegment
              key={segment.id}
              segmentId={segment.id}
              isSortingContainer={isSortingContainer}
            ></DroppableSegment>
          ))}
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
      {activeId && !(activeId in selectedShowSegments) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>
  )

  function renderSegmentDragOverlay(segmentId: string) {
    const segment = findSegment(segmentId)
    if (!segment) throw new Error('invalid overlay')

    switch (segment.type) {
      case 'QUESTIONS':
        return (
          <QuestionSegment
            isSortingContainer={true}
            segmentId={segmentId}
            isDragging={false}
            isDragOverlay
          ></QuestionSegment>
        )
      case 'SCORES':
        return (
          <ScoreSegment
            key={segment.id}
            segmentId={segment.id}
            isDragging={false}
            isDragOverlay
          ></ScoreSegment>
        )
      default:
        const _exhaustiveCheck: never = segment
        return _exhaustiveCheck
    }
  }

  function renderQuestionDragOverlay(questionId: string) {
    const segmentId = findSegment(questionId)?.id

    if (!segmentId) return null

    return <BoardQuestion id={questionId} segmentId={segmentId} isDragOverlay />
  }
}

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
  recentlyMovedToNewContainer: React.MutableRefObject<boolean>
) {
  const lastOverId = useRef<UniqueIdentifier | null>(null)

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      let overId = rectIntersection(args)

      // Check if dragging segment
      if (activeId && activeId in selectedShowSegments) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in selectedShowSegments
          ),
        })
      }

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return overId
        }

        if (overId in selectedShowSegments) {
          const segment = selectedShowSegments[overId]
          // If a container is matched and it contains items
          if (
            isQuestionSegment(segment) &&
            Object.keys(segment.questions).length > 0
          ) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && container.id in segment.questions
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
    [activeId, recentlyMovedToNewContainer, selectedShowSegments]
  )

  return collisionDetectionStrategy
}

function Trash({ id }: { id: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: '50%',
        marginLeft: -25,
        top: 10,
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: 'white',
        border: '2px solid',
        borderColor: isOver ? 'red' : '#f3f3f3',
      }}
    >
      <TrashIcon />
    </div>
  )
}
