import { ReactNode } from 'react'
import styled from 'styled-components'
import { Sidebar } from './Sidebar'

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper>
      <Sidebar />
      <LayoutContent>{children}</LayoutContent>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  display: flex;
  height: 100%;
`

const LayoutContent = styled.div`
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
`
