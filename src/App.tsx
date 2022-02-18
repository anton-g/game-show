import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { SidebarLayout } from './components/common/SidebarLayout'
import { Creator } from './components/creator/Creator'
import { QuestionPage } from './components/library/edit-question/QuestionPage'
import { Library } from './components/library/grid/Library'
import { ExternalPresentationReceiver } from './components/presentation/ExternalPresentation'
import {
  PresentationControls,
  PresentationMessageProvider,
} from './components/presentation/PresentationsControl'

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SidebarLayout>
            <Wrapper>hello :)</Wrapper>
          </SidebarLayout>
        }
      />
      <Route path="/play" element={<PresentationControls />} />
      <Route
        path="/play/external"
        element={
          <PresentationMessageProvider>
            <ExternalPresentationReceiver />
          </PresentationMessageProvider>
        }
      />
      <Route
        path="/editor"
        element={
          <SidebarLayout>
            <Creator />
          </SidebarLayout>
        }
      />
      <Route
        path="/library"
        element={
          <SidebarLayout>
            <Library />
          </SidebarLayout>
        }
      />
      <Route path="/library/question/" element={<QuestionPage />} />
      <Route path="/library/question/:questionId" element={<QuestionPage />} />
    </Routes>
  )
}

const Wrapper = styled.div`
  padding: 32px 24px;

  > *:not(:first-child) {
    margin-left: 24px;
  }
`
