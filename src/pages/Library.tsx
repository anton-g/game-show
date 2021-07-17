import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LibraryGrid } from '../components/library/grid/LibraryGrid'
import { LibraryTable } from '../components/library/table/LibraryTable'

export function Library() {
  return (
    <Wrapper>
      <Title>Library</Title>
      <Link to="/library/question">New</Link>
      <LibraryTable></LibraryTable>
      <LibraryGrid></LibraryGrid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 16px;
`

const Title = styled.h1``
