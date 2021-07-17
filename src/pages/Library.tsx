import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from '../components/common/forms'
import { Spacer } from '../components/common/Spacer'
import { LibraryTable } from '../components/library/table/LibraryTable'

export function Library() {
  const [filter, setFilter] = useState('')

  return (
    <Wrapper>
      <Title>Library</Title>
      <Spacer size={16}></Spacer>
      <Controls>
        <Button to="/library/question">New question</Button>
        <Spacer axis="horizontal" size={16}></Spacer>
        <Input
          placeholder="Filter"
          onChange={(e) => setFilter(e.target.value)}
        ></Input>
      </Controls>
      <Spacer size={16}></Spacer>
      <LibraryTable filter={filter}></LibraryTable>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 16px;
`

const Title = styled.h1``

const Controls = styled.div`
  display: flex;
`

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.colors.gray9};
  border: 0;
  border-radius: 4px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  transition: background-color 0.15s;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
`
