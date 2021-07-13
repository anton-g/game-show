import styled, { css } from 'styled-components'

export const TextArea = styled.textarea`
  border-radius: 4px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  padding: 10px 14px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  padding: 4px 0 8px;
  font-size: 14px;
  font-weight: 500;
`

export const Input = styled.input<{ error?: boolean }>`
  border-radius: 4px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  padding: 10px 14px;

  ${(p) =>
    p.error &&
    css`
      border-color: ${({ theme }) => theme.colors.tomato7};
    `}
`

export const FieldError = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.tomato11};
  font-weight: 500;
`
