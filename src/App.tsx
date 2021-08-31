import styled from 'styled-components'
import { NavBar } from './components/common/NavBar'
import { ShowSelector } from './components/ShowSelector'

export function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Wrapper>
        <ShowSelector></ShowSelector>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  padding: 32px 24px;

  > *:not(:first-child) {
    margin-left: 24px;
  }
`
