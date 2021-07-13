import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
`

const Chevron = styled.svg`
  grid-area: select;
  justify-self: end;
  margin-right: 16px;
  height: 20px;
  width: 20px;
`

const StyledSelect = styled.select`
  border-radius: 4px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  appearance: none;
  width: 100%;
  grid-area: select;
  padding: 10px 14px;
`

type Props = { children: ReactNode } & React.ComponentPropsWithoutRef<
  typeof StyledSelect
>

export const Select = React.forwardRef(
  ({ children, ...props }: Props, ref: any) => {
    return (
      <Wrapper>
        <StyledSelect {...props} ref={ref}>
          {children}
        </StyledSelect>
        <Chevron
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </Chevron>
      </Wrapper>
    )
  }
)
