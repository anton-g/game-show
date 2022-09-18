import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  DragEndEvent,
  MeasuringStrategy,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  defaultDropAnimation,
  DropAnimation,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { useActions, useAppState } from '../../overmind'
import { QuestionSegment } from './segments/QuestionSegment'
import { Question, Segment } from '../../overmind/types'
import { createPortal } from 'react-dom'
import { DroppableSegment } from './segments/DroppableSegment'
import { BoardQuestion } from './BoardQuestion'
import { ScoreSegment } from './segments/ScoreSegment'
import { useCustomCollisionDetection } from './useCustomCollisionDetection'
import { Trash } from './Trash'

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

export type ActiveId = Segment['id'] | Question['id'] | null

export const TRASH_ID = 'void'
export const PLACEHOLDER_ID = 'placeholder'

export const Board = () => {
  const { selectedShowSegments, selectedShowSegmentsList } = useAppState()
  const {
    findSegment,
    reorderSegment,
    moveOrReorderQuestion,
    removeSegmentQuestion,
    addQuestionSegment,
  } = useActions().builder
  const [activeId, setActiveId] = useState<ActiveId>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const isSortingContainer = activeId
    ? activeId in selectedShowSegmentsList
    : false

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
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

    if (overId === PLACEHOLDER_ID) {
      addQuestionSegment({
        withQuestionId: active.id,
      })
      setActiveId(null)
      return
    }

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
          items={[...segmentIds, PLACEHOLDER_ID]}
          strategy={horizontalListSortingStrategy}
        >
          {selectedShowSegmentsList.map((segment) => (
            <DroppableSegment
              key={segment.id}
              segmentId={segment.id}
              isSortingContainer={isSortingContainer}
            ></DroppableSegment>
          ))}
          <DroppableSegment
            segmentId={PLACEHOLDER_ID}
            isSortingContainer={isSortingContainer}
          ></DroppableSegment>
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
  overflow-x: auto;

  > * {
    margin-left: 16px;
  }
`
