import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { QuestionSegment } from './boardSegment/QuestionSegment'
import { ScoreSegment } from './boardSegment/ScoreSegment'

export function Segments({ children }: { children: ReactNode }) {
  const { selectedShowSegmentsList } = useAppState()

  return null
}
