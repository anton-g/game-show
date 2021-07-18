import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Spacer } from './Spacer'

export function NavBar() {
  return (
    <Wrapper>
      <Logo to="/">GSE</Logo>
      <Spacer axis="horizontal" size={48}></Spacer>
      <NavLink to="/library">Library</NavLink>
      <Spacer axis="horizontal" size={16}></Spacer>
      <NavLink to="/creator">Shows</NavLink>
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
