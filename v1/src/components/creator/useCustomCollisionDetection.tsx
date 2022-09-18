import { useRef, useCallback } from 'react'
import {
  UniqueIdentifier,
  CollisionDetection,
  rectIntersection,
  closestCenter,
} from '@dnd-kit/core'
import { Segment } from '../../overmind/types'
import { isQuestionSegment } from '../../utils/type-utils'
import { ActiveId, TRASH_ID } from './Board'

export function useCustomCollisionDetection(
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
