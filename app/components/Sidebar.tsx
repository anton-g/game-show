import { NavLink } from "@remix-run/react";
import styled from "styled-components";
import {
  ButtonIcon,
  DashboardIcon,
  GearIcon,
  HomeIcon,
  LayoutIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { Spacer } from "~/components/Spacer";

export function Sidebar() {
  return (
    <SidebarWrapper>
      <Header>
        <Title>Menu</Title>
      </Header>
      <Menu>
        <MenuItem>
          <MenuLink to="/">
            <HomeIcon />
            <Spacer size={8} />
            Library
          </MenuLink>
        </MenuItem>
        <SubMenuItem>
          <MenuLink to="/shows">
            <DashboardIcon />
            <Spacer size={8} />
            Shows
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/segments">
            <LayoutIcon />
            <Spacer size={8} />
            Segments
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/questions">
            <ButtonIcon />
            <Spacer size={8} />
            Questions
          </MenuLink>
        </SubMenuItem>
      </Menu>
      <Spacer size={48} />
      <BottomMenu>
        <MenuItem>
          <MenuLink to="/foo">
            <MoonIcon></MoonIcon>
            <Spacer size={8} />
            Something
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/settings">
            <GearIcon></GearIcon>
            <Spacer size={8} />
            Settings
          </MenuLink>
        </MenuItem>
      </BottomMenu>
    </SidebarWrapper>
  );
}
const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 225px;
  padding: 16px 8px;
  background-color: ${({ theme }) => theme.colors.gray3};
`;
const Header = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  margin-bottom: 48px;
`;
const Title = styled.h1`
  margin: 0;
  padding: 0;
`;
const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const BottomMenu = styled(Menu)`
  margin-top: auto;
`;
const MenuItem = styled.li``;
const SubMenuItem = styled(MenuItem)`
  margin-left: 24px;
`;
const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  border-radius: 4px;
  line-height: 1;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray12};

  &.active {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`;
