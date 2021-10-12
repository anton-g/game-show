import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppState } from '../../overmind'
import { Spacer } from './Spacer'

export function NavBar() {
  const { selectedShow: currentShow } = useAppState()

  return (
    <Wrapper>
      <Logo to="/">GSE</Logo>
      <Spacer size={48} axis="horizontal"></Spacer>
      <NavLink to="/library">Library</NavLink>
      <Spacer size={16} axis="horizontal"></Spacer>
      <NavLink to="/creator">Show builder</NavLink>
      <ShowName>{currentShow?.name}</ShowName>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 36px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  padding: 0 16px;
`

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray12};
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray12};
`

const ShowName = styled.div`
  margin-left: auto;
`
