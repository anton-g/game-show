import styled from 'styled-components'
import { AnswerType } from '../../overmind/types'
import { Spacer } from '../common/Spacer'

export function AnswerTypeIcon({ type }: { type: AnswerType }) {
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

const buzzSingleIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    transform-origin="50% 50%"
    transform="rotate(-90)"
    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
  />
)

const optionsMultiIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M4 6h16M4 10h16M4 14h16M4 18h16"
  />
)

const physicalIconPath = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
  />
)

const paths: Record<AnswerType, { path: JSX.Element; name: string }> = {
  BUZZ_SINGLE: { path: buzzSingleIconPath, name: 'Single buzz' },
  OPTIONS_MULTI: { path: optionsMultiIconPath, name: 'Multiple options' },
  OPTIONS_SINGLE: { path: optionsMultiIconPath, name: 'Single option' },
  PHYSICAL: { path: physicalIconPath, name: 'Physical' },
}
