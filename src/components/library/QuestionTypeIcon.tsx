import styled from 'styled-components'
import { Question } from '../../overmind/state'
import { Spacer } from '../common/Spacer'

export function QuestionTypeIcon({ type }: { type: Question['type'] }) {
  const path = paths[type]
  return (
    <IconWrapper>
      <Icon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        {path.path}
      </Icon>
      <Spacer size={4} axis="horizontal"></Spacer>
      {path.name}
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.svg`
  width: 16px;
  height: 16px;
`

const videoIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
  />
)

const imageIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  />
)

const textIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
)

const soundIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
  />
)

const paths: Record<Question['type'], { path: JSX.Element; name: string }> = {
  SOUND: { path: soundIconPath, name: 'Sound' },
  TEXT: { path: textIconPath, name: 'Text' },
  IMAGE: { path: imageIconPath, name: 'Image' },
  VIDEO: { path: videoIconPath, name: 'Video' },
}
