import { Outlet } from "@remix-run/react";
import styled from "styled-components";
import { Sidebar } from "../components/Sidebar";

export default function Index() {
  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 16px;
`;
