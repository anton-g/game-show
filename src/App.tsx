import styled from 'styled-components'
import { SidebarLayout } from './components/common/SidebarLayout'

export function App() {
  return (
    <SidebarLayout>
      <Wrapper>hello :)</Wrapper>
    </SidebarLayout>
  )
}

const Wrapper = styled.div`
  padding: 32px 24px;

  > *:not(:first-child) {
    margin-left: 24px;
  }
`
