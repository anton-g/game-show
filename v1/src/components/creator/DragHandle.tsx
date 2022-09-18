import styled from 'styled-components'

export const DragHandle = styled.button`
  cursor: grab;
  background: none;
  border: none;
  color: hsl(0 0% 30%);
  border-radius: 4px;
  padding: 8px 4px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  svg {
    height: 20px;
    width: 20px;
  }
`
