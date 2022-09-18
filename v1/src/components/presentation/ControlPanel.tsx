import { ReactNode } from 'react'
import styled from 'styled-components'
import { Spacer } from '../common/Spacer'

export const ControlPanel = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <PanelWrapper>
      <PanelTitle>{title}</PanelTitle> {/* todo move to composable */}
      <Spacer size={8} />
      {children}
    </PanelWrapper>
  )
}
const PanelWrapper = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 4px;
`
const PanelTitle = styled.h2`
  width: fit-content;
  padding: 0 8px;
  margin: -24px -8px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
  background-color: ${({ theme }) => theme.colors.gray1};
  color: ${({ theme }) => theme.colors.gray11};
`
