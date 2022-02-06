import styled from 'styled-components'

export function QuestionTimer({ progress }: { progress: number }) {
  return (
    <Wrapper>
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="tomato"
          stroke-width="10"
          stroke-dasharray={`calc(${progress} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
      </svg>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`
